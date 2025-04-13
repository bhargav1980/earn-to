
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Award, 
  User, 
  LogOut, 
  BarChart4
} from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Quizzes",
    icon: BookOpen,
    href: "/quizzes",
  },
  {
    label: "Rewards",
    icon: Award,
    href: "/rewards",
  },
  {
    label: "Leaderboard",
    icon: BarChart4,
    href: "/leaderboard",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <aside className="hidden md:flex flex-col bg-sidebar border-r border-sidebar-border w-64 p-6 min-h-screen">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-gradient-to-r from-brand-purple to-brand-teal p-2 rounded-lg">
          <span className="text-white font-bold">L2E</span>
        </div>
        <span className="text-lg font-bold">LearnToEarn</span>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-brand-purple text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-3 mt-4 text-red-500 hover:bg-red-50 rounded-md transition-colors"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default DashboardSidebar;
