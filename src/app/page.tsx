"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/header";
import Regional from "../components/regional";
import Postcode from "../components/postcode";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-md px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-50px)]">
        <h1 className="mb-5 font-bold text-3xl">EASY AREA LOCATOR</h1>
        <Tabs className="w-full" defaultValue="regional">
          <TabsList className="w-full gap-3 mb-5">
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="name">Name</TabsTrigger>
            <TabsTrigger value="postcode">Postcode</TabsTrigger>
          </TabsList>
          <TabsContent value="regional">
            <Regional />
          </TabsContent>
          <TabsContent value="postcode">
            <Postcode />
          </TabsContent>
        </Tabs>
        <p className="mt-10 text-xs italic">
          Builded on top of{" "}
          <Link
            href="https://www.npmjs.com/package/tz-geo-data"
            target="blank"
            className="text-white px-1 pb-0.5 rounded bg-gray-600"
          >
            tz-geo-data
          </Link>{" "}
          library
        </p>
      </div>
    </div>
  );
}
