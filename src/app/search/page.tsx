"use client";

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { getGeoData } from "tz-geo-data";
import NoDatFound from "./no-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Street {
  name: string;
  places: string[];
}

interface GeoData {
  region: string;
  regionPostcode: number;
  district: string;
  districtPostcode: number;
  ward: string;
  wardPostcode: number;
  streets: Street[];
}

interface ApiResponse {
  region: string;
  district: string;
  ward: string;
  street?: string;
  places?: string[];
  regionPostcode?: number;
  districtPostcode?: number;
  wardPostcode?: number;
  streets?: Street[];
}

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasCookie("search")) {
      router.push("/");
      return;
    }

    const fetchGeoData = async () => {
      try {
        const rawSearchValues = getCookie("search");
        if (!rawSearchValues) {
          throw new Error("No search data found");
        }

        const searchValues = JSON.parse(rawSearchValues.toString());
        if (!searchValues?.ward) {
          throw new Error("Ward missing in search data");
        }

        const result: ApiResponse = await getGeoData(searchValues.ward);
        if (!result) {
          throw new Error("No geo data returned from API");
        }

        // Transform API response to match GeoData interface
        const transformedData: GeoData = {
          region: result.region,
          regionPostcode: result.regionPostcode || 0,
          district: result.district,
          districtPostcode: result.districtPostcode || 0,
          ward: result.ward,
          wardPostcode: result.wardPostcode || 0,
          streets: result.streets || [
            {
              name: result.street || "Unknown Street",
              places: result.places || [],
            },
          ],
        };

        setGeoData(transformedData);
      } catch (err) {
        console.error("Error fetching geo data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load location data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !geoData) {
    return <NoDatFound />;
  }

  return (
    <div className="min-h-screen px-4">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-10">
        {/* Region data */}
        <Card>
          <CardContent>
            <CardTitle className="text-xl justify-between w-full flex">
              <h1>
                Region / <span className="text-gray-500">Mkoa</span>
              </h1>
              <Badge>{geoData.regionPostcode}</Badge>
            </CardTitle>
            <CardDescription className="font-bold text-lg md:text-xl">
              <p>{geoData.region}</p>
            </CardDescription>
          </CardContent>
        </Card>

        {/* District data */}
        <Card>
          <CardContent>
            <CardTitle className="text-xl justify-between w-full flex">
              <h1>
                District / <span className="text-gray-500">Wilaya</span>
              </h1>
              <Badge>{geoData.districtPostcode}</Badge>
            </CardTitle>
            <CardDescription className="font-bold text-lg md:text-xl">
              <p>{geoData.district}</p>
            </CardDescription>
          </CardContent>
        </Card>

        {/* Ward data */}
        <Card>
          <CardContent>
            <CardTitle className="text-xl justify-between w-full flex">
              <h1>
                Ward / <span className="text-gray-500">Kata</span>
              </h1>
              <Badge>{geoData.wardPostcode}</Badge>
            </CardTitle>
            <CardDescription className="font-bold text-lg md:text-xl">
              <p>{geoData.ward}</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Streets Information */}
      {geoData.streets?.length > 0 && (
        <div className="mt-5">
          <h2 className="font-bold text-gray-800 mb-4 uppercase">
            Streets in {geoData.ward}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {geoData.streets.map((street) => (
              <StreetCard key={street.name} street={street} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StreetCard({ street }: { street: Street }) {
  return (
    <>
      {street.places.length < 1 ? null : (
        <Card>
          <CardHeader>
            <CardTitle>{street.name}</CardTitle>
            <CardDescription>Centers at {street.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Command>
              {/* <CommandInput placeholder="Quick search" /> */}
              <CommandList>
                <CommandEmpty>--No center found--</CommandEmpty>
                <CommandGroup>
                  {street.places.map((place, index) => (
                    <CommandItem key={index}>{place}</CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      )}
    </>
  );
}
