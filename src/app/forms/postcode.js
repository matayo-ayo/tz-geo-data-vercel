export default function Postcode() {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="postcode"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Postcode
        </label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-600/50 outline-none transition-all"
          placeholder="e.g. 12345"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-800 mt-5 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
}
