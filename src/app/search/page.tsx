/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { getGeoData } from "tz-geo-data";

interface SearchValues {
  region?: string;
  district?: string;
  ward?: string;
  // Add other expected properties here
}

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [geoData, setGeoData] = useState<any>(null);
  const [searchValues, setSearchValues] = useState<SearchValues | null>(null);

  useEffect(() => {
    if (!hasCookie("search")) {
      router.push("/");
      return;
    }

    try {
      const rawSearchValues = getCookie("search");
      const parsedValues = rawSearchValues
        ? JSON.parse(rawSearchValues.toString())
        : null;
      setSearchValues(parsedValues);
    } catch (err) {
      console.error("Failed to parse cookie data:", err);
      setError("Invalid search data");
    }
  }, [router]);

  useEffect(() => {
    if (!searchValues?.ward) return;

    const fetchGeo = async () => {
      try {
        const data = await getGeoData(`${searchValues.ward}`);
        console.log("Geo Data:", data);
        setGeoData(data);
      } catch (err) {
        console.error("Failed to load geo data:", err);
        setError("Failed to load geo data.");
      }
    };

    fetchGeo();
  }, [searchValues]);

  return (
    <div className="min-h-screen px-4">
      <Header />

      {/* Display search values */}
      {searchValues && (
        <div className="my-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-2">Search Values:</h2>
          <pre>{JSON.stringify(searchValues, null, 2)}</pre>
        </div>
      )}

      {/* Display geo data */}
      {geoData && (
        <div className="my-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-2">Geo Data:</h2>
          <pre>{JSON.stringify(geoData, null, 2)}</pre>
        </div>
      )}

      {/* Display error if any */}
      {error && (
        <div className="my-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}
