"use client";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-2">
      <nav className="max-w-screen-lg mx-auto p-2 mt-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            <Link href="/">Tanzania Geo Data</Link>
          </h1>

          <div className="flex items-center space-x-4 divide-x">
            <Select
              onValueChange={(e) => {
                setTheme(e);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder={theme} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="italic">
                    -- change theme--
                  </SelectLabel>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
