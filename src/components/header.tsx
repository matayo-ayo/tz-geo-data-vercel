"use client";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mx-2">
      <nav className="max-w-screen-lg mx-auto p-2 mt-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            <Link href="/">tz-geo-data</Link>
          </h1>

          <div className="flex items-center space-x-4 divide-x">
            <Link href="/about" className="px-3">
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
