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
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Postcode() {
  const [ward, setWard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ward != "") {
      setCookie(
        "search",
        { ward },
        {
          maxAge: 60 * 1,
        }
      );
      route.push(`/search`);
    } else {
      toast("Incorrect postcode", {
        description: "Postikodi si sahihi",
      });
      setError("Invalid postcode");
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Search by Postcode</CardTitle>
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
              name="ward"
              id="ward"
              placeholder="Postcode / Postikodi"
              pattern="[0-9]{2,5}"
              inputMode="numeric"
              title="Please use 2 to 5 digits"
              required
              autoComplete="off"
              value={ward}
              onChange={(e) => {
                setWard(e.target.value);
                setIsLoading(false);
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={!ward}
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
