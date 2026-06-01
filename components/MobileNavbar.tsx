"use client";

import Link from "next/link";
import { HomeIcon, Menu, Sprout, LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

type MobileNavbarProps = {
  isAuthenticated: boolean;
  signUpUrl: string;
};

export default function MobileNavbar({
  isAuthenticated,
  signUpUrl,
}: MobileNavbarProps) {
  return (
    <div className="flex items-center gap-2 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <div className="mt-8 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/plants">
                <Sprout className="h-4 w-4" />
                Plants
              </Link>
            </Button>

            {!isAuthenticated && (
              <Button className="mt-4" asChild>
                <Link href={signUpUrl}>
                  <LogOut className="h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
