import React from "react";
import Link from "next/link";
import Header from "../partials/header";

const page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="text-gray-200 container mx-auto px-4 py-8 space-y-2 text-justify text-sm">
        <h1 className="font-bold text-2xl">
          Tanzania Geolocation Data{" "}
          <Link
            href="https://www.npmjs.com/package/tz-geo-data"
            className="text-sm text-gray-400"
          >
            tz-geo-data
          </Link>
        </h1>
        <p>
          TZ Geo Data is a powerful and comprehensive geolocation data package
          tailored specifically for Tanzania. Designed for developers,
          businesses, and organizations, this package offers structured and
          accurate geographical data, making it easier to integrate Tanzanian
          location-based information into various applications
        </p>

        <p>
          With an extensive database covering all regions, districts, wards,
          streets, and their corresponding postcodes, TZ Geo Data simplifies
          access to administrative and postal code data. Whether you are building
          an e-commerce platform, logistics system, or location-based service,
          this package ensures reliable and up-to-date geospatial information
        </p>

        <p>
          The package is optimized for seamless integration, supporting modern
          development standards and structured data formats. It provides a
          robust solution for those seeking efficiency and precision in
          Tanzanian geographical data management
        </p>

        <h1 className="font-bold text-2xl mt-8">Why tz-geo-data</h1>
        <ul className="space-y-1 list-disc">
          <li>Comprehensive and accurate Tanzanian location data</li>
          <li>Structured and developer-friendly format for easy integration</li>
          <li>
            Essential for businesses needing postal and administrative location
            details
          </li>
          <li>
            Designed to support diverse applications, from mapping to data
            analytics
          </li>
        </ul>

        <h1 className="font-bold text-2xl mt-8">Author</h1>
        <h3 className="font-medium text-lg">Matayo Ayo</h3>
        <ul className="space-y-1 list-disc text-sm">
          <li>
            Github :{" "}
            <Link
              href="https://github.com/matayo-ayo/"
              className="text-gray-400"
            >
              matayo-ayo
            </Link>
          </li>
          <li>
            LinkedIn :{" "}
            <Link
              href="https://www.linkedin.com/posts/marakdavid_xr-ai-3d-ugcPost-7310554928744206336-Oop-?utm_source=share&utm_medium=member_desktop&rcm=ACoAADkQLcgBRfItD7SJLQxZKwSaNDDQknSqBxk"
              className="text-gray-400"
            >
              Matayo Ayo
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default page;
