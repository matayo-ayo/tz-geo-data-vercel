import { useState } from "react";
import { getGeoData } from "tz-geo-data";
import Modal from "./modal";

export default function Postcode() {
  const [postcode, setPostcode] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await getGeoData(postcode);
      setGeoData(data);
      setIsModalOpen(true);
    } catch (err) {
      setError("Failed to fetch postcode data. Please try again.");
      console.error(err);
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
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">
          Postcode Details for {postcode}
        </h2>

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
                    <p className="text-gray-500">No specific places listed</p>
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
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Postcode
          </label>
          <input
            type="number"
            name="postcode"
            id="postcode"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-600/50 outline-none transition-all"
            placeholder="e.g. 21101"
            pattern="[0-9]{2,5}"
            minLength={2}
            maxLength={5}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-green-800 mt-5 hover:bg-green-700/50 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4 bg-green-950 overflow-y-auto scrollbar-hide">
          {renderGeoData()}
          <div className="mt-6 text-center">
            <button
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
