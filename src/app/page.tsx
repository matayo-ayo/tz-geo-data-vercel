"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/header";
import Location from "./forms/location";
import Postcode from "./forms/postcode";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-md px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-50px)]">
        <Tabs className="w-full" defaultValue="location">
          <TabsList className="w-full gap-3 mb-5">
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="postcode">Postcode</TabsTrigger>
          </TabsList>
          <TabsContent value="location">
            <Location />
          </TabsContent>
          <TabsContent value="postcode">
            <Postcode />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
