import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const dashboardPaths = ["/dashboard", "/upload", "/analysis", "/history", "/skill-gap", "/jobs", "/interview", "/admin"];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const showSidebar = dashboardPaths.some((path) => pathname.startsWith(path));

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className={showSidebar ? "lg:grid lg:grid-cols-[18rem_1fr]" : ""}>
        {showSidebar && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
      {!showSidebar && <Footer />}
    </div>
  );
};

export default MainLayout;
