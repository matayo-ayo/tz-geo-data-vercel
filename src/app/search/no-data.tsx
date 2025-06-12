"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoDatFound() {
  const route = useRouter();
  return (
    <>
      <div className="max-w-sm mx-auto w-full h-screen flex justify-center items-center transition-all">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to proces your search
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                route.push("/");
              }}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
