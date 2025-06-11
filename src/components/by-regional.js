/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { getAllRegions, getDistrictData, getWardData } from "tz-geo-data";
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

export default function Regional() {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");

  const regionList = getAllRegions() || [];
  const districtList = region ? getDistrictData(region) || [] : [];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Search by region</CardTitle>
            <CardDescription>
              {error ? (
                <p className="text-red-500 text-sm mt-2">{error}</p>
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
                }}
                disabled={!region}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select District / Chagua Wilaya --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Districts List / Orodha ya Wilaya</SelectLabel>
                    {districtList.map((i) => (
                      <SelectItem value={i.name} key={i.postcode}>
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
