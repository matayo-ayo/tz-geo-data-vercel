"use client";

import Header from "./components/header";
import Location from "./forms/location";
import Postcode from "./forms/postcode";
import { useState } from "react";

export default function Home() {
  const [searchForm, setSearchFprm] = useState("location");
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-50px)]">
        <div
          className={`w-full max-w-md ${
            searchForm === "location"
              ? "bg-blue-950/10 border-blue-900 shadow-blue-500/40"
              : "bg-green-950/10 border-green-900 shadow-green-500/40"
          } rounded-xl shadow-2xl overflow-hidden border`}
        >
          <div className="w-full grid grid-cols-2">
            <button
              onClick={() => {
                setSearchFprm("location");
              }}
              type="button"
              className="py-3 text-center uppercase bg-blue-900 font-bold text-gray-300"
            >
              Ramani
            </button>
            <button
              onClick={() => {
                setSearchFprm("postcode");
              }}
              type="button"
              className="py-3 text-center uppercase bg-green-900 font-bold text-gray-300"
            >
              Postikodi
            </button>
          </div>

          <div className="p-6 space-y-6">
            {searchForm === "location" ? <Location /> : <Postcode />}
          </div>
        </div>
      </main>
    </div>
  );
}
