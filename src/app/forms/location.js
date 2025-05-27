/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  getAllRegions,
  getDistrictData,
  getWardData,
  getGeoData,
} from "tz-geo-data";
import Modal from "./modal";

export default function Location() {
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
        {/* Region Selection */}
        <div>
          <label
            htmlFor="region"
            className="block font-semibold mb-1"
          >
            Mkoa
          </label>
          <select
            required
            name="region"
            id="region"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setDistrict("");
              setWard("");
            }}
            className="w-full px-4 py-2 rounded-lg outline-none transition-all italic font-normal text-sm"
          >
            <option value="" disabled hidden>
              -- Chagua Mkoa --
            </option>
            {regionList.map((e) => (
              <option key={e.postcode} value={e.region}>
                {e.region}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div>
          <label
            htmlFor="district"
            className="block font-semibold mb-1"
          >
            Wilaya
          </label>
          <select
            required
            name="district"
            id="district"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setWard("");
            }}
            className="w-full px-4 py-2 rounded-lg outline-none transition-all italic font-normal text-sm"
            disabled={!region}
          >
            <option value="" disabled hidden>
              -- Chagua Wilaya --
            </option>
            {districtList.map((e) => (
              <option key={e.postcode} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ward Selection */}
        <div>
          <label
            htmlFor="ward"
            className="block font-semibold mb-1"
          >
            Kata
          </label>
          <select
            required
            name="ward"
            id="ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="w-full px-4 py-2 rounded-lg outline-none transition-all italic font-normal text-sm"
            disabled={!district} // Disable if no district is selected
          >
            <option value="" disabled hidden>
              -- Chagua kata --
            </option>
            {wardList.map((e) => (
              <option key={e.postcode} value={e.postcode}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full bg-blue-800 mt-5 hover:bg-blue-700 text-white font-semibold font-sans py-2 px-4 rounded-lg transition-colors duration-200 ${
            isLoading ? "opacity-20 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Inatafuta ..." : "Tafuta"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
