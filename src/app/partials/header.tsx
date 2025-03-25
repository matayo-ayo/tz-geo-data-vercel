import Link from "next/link";

const Header = () => {
  return (
    <div className="mx-2">
      <nav className="max-w-screen-lg mx-auto p-2 mt-4 rounded-md border border-gray-600">
        <div className="flex justify-between">
          <h1 className="font-bold">
            <Link href="/">tz-geo-data</Link>
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Header;
