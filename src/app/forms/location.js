export default function Location() {
  return (
    <>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Region name
          </label>
          <input
            type="text"
            name="region"
            id="region"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
            placeholder="e.g. Dar Es Salaam"
            require
            minLength={4}
          />
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            District name
          </label>
          <input
            type="text"
            name="district"
            id="district"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
            placeholder="e.g. Kinondoni"
            require
            minLength={4}
          />
        </div>

        <div>
          <label
            htmlFor="ward"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Ward name
          </label>
          <input
            type="text"
            name="ward"
            id="ward"
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
            placeholder="e.g. Mwananyamala"
            require
            minLength={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 mt-5 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </>
  );
}
