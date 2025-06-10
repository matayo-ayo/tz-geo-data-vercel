/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  getAllRegions,
  getDistrictData,
  getWardData,
  getGeoData,
} from "tz-geo-data";
import Modal from "../app/forms/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
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

export default function Regional() {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [geoData, setGeoData] = useState("");

  const regionList = getAllRegions() || [];
  const districtList = region ? getDistrictData(region) || [] : [];
  const wardList = district ? getWardData(region, district) || [] : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await getGeoData(ward);
      setGeoData(data);
      setIsModalOpen(true);
    } catch (err) {
      setError("Failed to fetch postcode data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderGeoData = () => {
    if (!geoData) return <p>No data found for this postcode.</p>;

    return (
      <div className="space-y-4 text-gray-200">
        <h2 className="text-2xl font-bold mb-4">GEOLOCATION INFO</h2>
        <p>{`${geoData.region} > ${geoData.ward}`}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Region</h3>
            <p>
              {geoData.region} ({geoData.regionPostcode})
            </p>
          </div>

          <div className="bg-green-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">District</h3>
            <p>
              {geoData.district} ({geoData.districtPostcode})
            </p>
          </div>

          <div className="bg-green-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Ward</h3>
            <p>
              {geoData.ward} ({geoData.wardPostcode})
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Streets and Places</h3>
          <div className="space-y-3">
            {geoData.streets?.map((street, index) => (
              <div key={index} className="bg-green-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{street.name}</h4>
                <div className="pl-4">
                  {street.places?.length > 0 && street.places[0] ? (
                    <ul className="list-disc pl-5">
                      {street.places.map((place, placeIndex) => (
                        <li key={placeIndex}>
                          {place || "No specific places listed"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No specific places listed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
                "Tafuta mitaa kwa mkoa"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 container">
            {/* Region Selection */}
            <div>
              <label htmlFor="region" className="mb-1 text-sm font-semibold">
                Region / <span className="text-gray-500">Mkoa</span>
              </label>
              <Select
                name="region"
                id="region"
                value={region}
                onValueChange={(e) => {
                  setRegion(e);
                  setDistrict("");
                  setWard("");
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
              <label htmlFor="district" className="mb-1 text-sm font-semibold">
                District / <span className="text-gray-500">Wilaya</span>
              </label>
              <Select
                name="district"
                id="district"
                value={district}
                onValueChange={(e) => {
                  setDistrict(e);
                  setWard("");
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

            {/* Ward Selection */}
            <div>
              <label htmlFor="ward" className="mb-1 text-sm font-semibold">
                Ward / <span className="text-gray-500">Kata</span>
              </label>
              <Select
                name="ward"
                id="ward"
                value={ward}
                onValueChange={(e) => {
                  setWard(e);
                }}
                disabled={!district}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select Ward / Chagua Kata --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ward List / Orodha ya Kata</SelectLabel>
                    {wardList.map((i) => (
                      <SelectItem value={i.postcode} key={i.postcode}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div></div>
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

      {/* Modal  */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4 overflow-y-auto scrollbar-hide">
          {renderGeoData()}
          <div className="mt-6 text-center">
            <button
              onClick={closeModal}
              className="text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
