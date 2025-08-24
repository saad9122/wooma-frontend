"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Users, FileText, Menu, ChevronLeft, Bell } from "lucide-react";
import Sidebar from "../_components/sidebar";
import ReportSummary from "../_components/reportsSummary/ReportSummary";
import { RequireAuth } from "../_components/Guards";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navigationItems = [
    { name: "Users", href: "/users", icon: Users, current: pathname.startsWith("/users") },
    { name: "Reports", href: "/reports", icon: FileText, current: pathname.startsWith("/reports") },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
    <Sidebar
      isMobile={isMobile}
      sidebarOpen={sidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      navigationItems={navigationItems}
      onClose={() => setSidebarOpen(false)}
      onNavigate={handleNavigation}
      onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
    />

    {/* Main content */}
    <div
      className={`transition-all duration-300 ${
        isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
      }`}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              {!isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <ChevronLeft
                    className={`w-5 h-5 transition-transform duration-200 ${
                      sidebarCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900">
                {navigationItems.find((item) => item.current)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Report Summary */}
      <section className="px-4 sm:px-6 lg:px-8 mt-6">
        <ReportSummary />
      </section>

      {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
    </div>
      </div>
    </RequireAuth>
  );
};

export default DashboardLayout;
