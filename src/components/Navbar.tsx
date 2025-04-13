
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-brand-purple flex items-center gap-2">
          <div className="bg-gradient-to-r from-brand-purple to-brand-teal p-2 rounded-lg">
            <span className="text-white font-bold">L2E</span>
          </div>
          <span>LearnToEarn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground hover:text-brand-purple transition-colors">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-brand-purple transition-colors">
                Dashboard
              </Link>
              <Link to="/quizzes" className="text-foreground hover:text-brand-purple transition-colors">
                Quizzes
              </Link>
              <Link to="/rewards" className="text-foreground hover:text-brand-purple transition-colors">
                Rewards
              </Link>
            </>
          ) : null}
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-brand-purple transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-foreground hover:text-brand-purple transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/quizzes" 
                  className="text-foreground hover:text-brand-purple transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quizzes
                </Link>
                <Link 
                  to="/rewards" 
                  className="text-foreground hover:text-brand-purple transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rewards
                </Link>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-brand-purple transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
