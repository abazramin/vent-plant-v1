import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, LogOut, Sprout } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { stackServerApp } from "@/stack/server";
import { UserButton } from "@stackframe/stack";
import MobileNavbar from "./MobileNavbar";

async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-muted">
            🌱
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">
              Plantventory
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Plant Management System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/plants">
              <Sprout className="h-4 w-4" />
              Plants
            </Link>
          </Button>

          <ModeToggle />

          {!user ? (
            <Button asChild>
              <Link href={app.signUp}>
                <LogOut className="h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar isAuthenticated={!!user} signUpUrl={app.signUp} />
      </div>
    </header>
  );
}

export default Navbar;
