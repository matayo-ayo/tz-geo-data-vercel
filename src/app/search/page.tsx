"use client";

type District = {
  [x: string]: ReactNode;
  district: string;
  postcode: string;
};

// type Ward = {
//   name: string;
//   postcode: string;
//   streets: [];
// };

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCookie, hasCookie } from "cookies-next";
import { getDistrictData } from "tz-geo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const cookiesStatus = hasCookie("regionSelected");
  const route = useRouter();
  const region = getCookie("regionSelected");
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    if (cookiesStatus === false) {
      return route.push("/");
    }

    if (!region) {
      toast("No region specified", {
        description: "Hakuna mkoa uliochaguliwa.",
      });
      route.push("/");
    }

    // Get districts
    const districtData = getDistrictData(`${region}`);
    if (!districtData)
      throw new Error(`Failed to get districts from ${region}`);
    setDistricts(districtData);

    // Get wards
    // const wardData = getWardData(`${region}`, {districtData.map((d) => )});
  }, [region, route, cookiesStatus]);

  return (
    <div className="min-h-screen px-4">
      <Header />
      <h1 className="mb-5 font-bold text-3xl text-center w-full">{region}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {districts.map((d) => (
          <Card key={d.postcode}>
            <CardHeader>
              <CardTitle>{d.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Postcode: {d.postcode}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
