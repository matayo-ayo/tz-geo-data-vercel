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

export default function Postcode() {
  const [postcode, setPostcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // try {
    //   const data = await getGeoData(postcode);
    //   setGeoData(data);
    //   setIsModalOpen(true);
    // } catch (err) {
    //   setError("Failed to fetch postcode data. Please try again.");
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Search by postcode</CardTitle>
            <CardDescription>
              {error ? (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              ) : (
                "Tafuta eneo kwa postikodi"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="postcode" className="mb-1 text-sm font-semibold">
              Postcode / <span className="text-gray-500">Postikodi</span>
            </Label>
            <Input
              name="postcode"
              id="postcode"
              placeholder="Postcode / Postikodi"
              pattern="[0-9]{2,5}"
              inputMode="numeric"
              title="Please use 2 to 5 digits"
              required
              autoComplete="off"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
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
