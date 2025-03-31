"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-2">
      <nav className="max-w-screen-lg mx-auto p-2 mt-4 rounded-md border border-gray-600">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            <Link href="/">tz-geo-data</Link>
          </h1>

          <div className="flex items-center space-x-4 divide-x">
            <Link href="/about" className="px-3">
              About
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2"
              >
                {theme === "dark" ? "☀" : "🌙"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
