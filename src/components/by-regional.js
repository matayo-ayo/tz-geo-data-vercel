/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import { getAllRegions, getDistrictData, getWardData } from "tz-geo-data";

export default function Regional() {
  // Cookies management
  if (hasCookie("search")) deleteCookie("search");
  const route = useRouter();
  // Region variables
  const [region, setRegion] = useState("");
  const regionList = getAllRegions() || [];
  // District variables
  const [district, setDistrict] = useState("");
  const districtsList = region ? getDistrictData(region) || [] : [];
  // Ward variables
  const [ward, setWard] = useState("");
  const wardList = district ? getWardData(region, district) || [] : [];
  //
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (region != "") {
      setCookie(
        "search",
        { region, district, ward },
        {
          maxAge: 60 * 1,
        }
      );
      route.push(`/search`);
    } else {
      toast("Please select a region to continue", {
        description: "Tafadhali chagua mkoa kuendelea.",
      });
      setError("Region not selected");
      route.push("/api/route.js");
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Search by region</CardTitle>
            <CardDescription>
              {error ? (
                <p className="text-red-500 font-semibold text-sm mt-2 animate-bounce">
                  {error}
                </p>
              ) : (
                "Tafuta eneo kwa mkoa"
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 container">
            {/* Region Selection */}
            <div>
              <Label htmlFor="region" className="mb-1 text-sm font-semibold">
                Region / <span className="text-gray-500">Mkoa</span>
              </Label>
              <Select
                name="region"
                id="region"
                value={region}
                onValueChange={(e) => {
                  setRegion(e);
                  setDistrict("");
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select Region / Chagua Mikoa --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Region List / Orodha ya Mikoa</SelectLabel>
                    {regionList.map((i) => (
                      <SelectItem value={i.region} key={i.postcode}>
                        {i.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* District Selection */}
            <div>
              <Label htmlFor="district" className="mb-1 text-sm font-semibold">
                District / <span className="text-gray-500">Wilaya</span>
              </Label>
              <Select
                name="district"
                id="district"
                value={district}
                onValueChange={(e) => {
                  setDistrict(e);
                  setWard("");
                }}
                required
                disabled={!region}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      !region
                        ? "No Region selected"
                        : "-- Select District / Chagua Wilaya --"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>District List / Orodha ya wilaya</SelectLabel>
                    {districtsList.map((i) => (
                      <SelectItem value={i.name} key={i.postcode}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Ward Selection */}
            <div>
              <Label htmlFor="ward" className="mb-1 text-sm font-semibold">
                Ward / <span className="text-gray-500">Kata</span>
              </Label>
              <Select
                name="ward"
                id="ward"
                value={ward}
                onValueChange={(e) => {
                  setWard(e);
                }}
                required
                disabled={!district}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      !district
                        ? "No Dirstict selected"
                        : "-- Select Ward / Chagua Kata --"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Wards in {district} / Wilaya ndani ya {region}
                    </SelectLabel>
                    {wardList.map((i) => (
                      <SelectItem value={`${i.postcode}`} key={i.postcode}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className={isLoading ? "opacity-20 cursor-not-allowed" : ""}
            >
              {isLoading ? "Searching" : "Search"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
