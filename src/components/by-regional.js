/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { getAllRegions } from "tz-geo-data";
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
import { deleteCookie, setCookie } from "cookies-next";

export default function Regional() {
  // cokies management
  deleteCookie("regionSelected");

  const route = useRouter();
  const [region, setRegion] = useState("");
  const regionList = getAllRegions() || [];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (region != "") {
      setCookie("regionSelected", region, {
        maxAge: 60 * 1,
      });
      route.push(`/search`);
    } else {
      toast("Please select a region to continue", {
        description: "Tafadhali chagua mkoa kuendelea.",
      });
      setError("Region not selected");
      route.push("/");
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
