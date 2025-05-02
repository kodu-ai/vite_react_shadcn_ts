import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scissors } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle"; // Assuming you have this from Shadcn setup

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Scissors className="h-6 w-6" />
            <span className="font-bold sm:inline-block">Sharp Cuts</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              to="/book"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Book Online
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              to="/"
              className="flex items-center space-x-2 mb-4"
            >
              <Scissors className="h-6 w-6" />
              <span className="font-bold">Sharp Cuts</span>
            </Link>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground/60 hover:text-foreground">Home</Link>
              <Link to="/book" className="text-foreground/60 hover:text-foreground">Book Online</Link>
              <Link to="/dashboard" className="text-foreground/60 hover:text-foreground">Dashboard</Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <ModeToggle />
           <Button asChild>
             <Link to="/book">Book Now</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}