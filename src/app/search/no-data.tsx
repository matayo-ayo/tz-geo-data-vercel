"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Error {
  msg: string;
}

export default function NoDatFound({ msg }: Error) {
  const route = useRouter();
  return (
    <>
      <div className="max-w-sm mx-auto w-full h-screen flex justify-center items-center transition-all">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {msg}
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
