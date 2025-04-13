
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-brand-purple flex items-center gap-2">
              <div className="bg-gradient-to-r from-brand-purple to-brand-teal p-2 rounded-lg">
                <span className="text-white font-bold">L2E</span>
              </div>
              <span>LearnToEarn</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Learn new skills, complete challenges, and earn real Aptos tokens
              as rewards.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rewards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} LearnToEarn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
