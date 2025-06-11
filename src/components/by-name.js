import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ByName() {
  const [areaName, setAreaName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Search by Area name</CardTitle>
            <CardDescription>
              {error ? (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              ) : (
                "Tafuta eneo kwa jina la eneo"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="areaName" className="mb-1 text-sm font-semibold">
              Area / <span className="text-gray-500"> Eneo</span>
            </Label>
            <Input
              name="areaName"
              id="areaName"
              placeholder="Area name / Jina la eneo"
              pattern="[0-9]{2,5}"
              inputMode="numeric"
              title="Please use 2 to 5 digits"
              required
              autoComplete="off"
              value={areaName}
              onChange={(e) => {
                setAreaName(e.target.value);
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "opacity-20 cursor-not-allowed" : ""}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
