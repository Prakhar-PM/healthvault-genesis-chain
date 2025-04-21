
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-health-primary text-white">
              <span className="absolute font-bold">H</span>
            </div>
            <span className="text-xl font-bold text-health-dark">
              HealthVault
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-health-primary">
            Home
          </Link>
          <Link to="/patient" className="text-sm font-medium hover:text-health-primary">
            Patient Portal
          </Link>
          <Link to="/hospital" className="text-sm font-medium hover:text-health-primary">
            Hospital Portal
          </Link>
          <Link to="/verify" className="text-sm font-medium hover:text-health-primary">
            Verify Records
          </Link>
          <Link to="/explorer" className="text-sm font-medium hover:text-health-primary">
            Blockchain Explorer
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Button 
              variant="default" 
              className="bg-health-primary hover:bg-health-secondary"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="border-health-primary text-health-primary hover:bg-health-soft"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
