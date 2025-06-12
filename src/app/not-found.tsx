"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { deleteCookie, hasCookie } from "cookies-next";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  // cookies management
  if (hasCookie("search")) deleteCookie("search");
  const route = useRouter();
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-50px)]">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>404 | Not Found</AlertTitle>
          <AlertDescription>
            This page may have been moved or might never have existed.
            <Button
              variant="destructive"
              onClick={() => {
                route.back();
              }}
            >
              Go back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
