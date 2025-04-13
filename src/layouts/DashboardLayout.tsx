
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <Navbar />
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar (visible on md screens and up) */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 py-8 px-4 md:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
