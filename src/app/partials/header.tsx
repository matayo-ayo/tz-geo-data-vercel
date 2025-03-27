import Link from "next/link";

const Header = () => {
  return (
    <div className="mx-2">
      <nav className="max-w-screen-lg mx-auto p-2 mt-4 rounded-md border border-gray-600">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold">
              <Link href="/">tz-geo-data</Link>
            </h1>
          </div>
          <div className="divide-x divide-gray-600 space-x-1.5 flex flex-row lowercase">
            <Link href="/about" className="px-3">About</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
