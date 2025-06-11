import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-50px)]">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>404 | Not Found</AlertTitle>
          <AlertDescription>
            This page may have been moved or might never have existed.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
