"use client";
import React from "react";
import { X, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

interface SidebarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  navigationItems: NavItem[];
  onClose: () => void;
  onNavigate: (href: string) => void;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  sidebarOpen,
  sidebarCollapsed,
  navigationItems,
  onClose,
  onNavigate,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/auth/signin");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 transform ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : sidebarCollapsed
            ? "translate-x-0 w-16"
            : "translate-x-0 w-64"
        } bg-white shadow-xl border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 border-b border-gray-200 ${
              sidebarCollapsed && !isMobile ? "px-3" : "px-4"
            }`}
          >
            {(!sidebarCollapsed || isMobile) && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
            )}

            {sidebarCollapsed && !isMobile && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            )}

            {isMobile && (
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.href)}
                  className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${
                    sidebarCollapsed && !isMobile
                      ? "justify-center px-2"
                      : "justify-start"
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 ${
                      item.current
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    } ${
                      sidebarCollapsed && !isMobile
                        ? "w-6 h-6"
                        : "w-5 h-5 mr-3"
                    }`}
                  />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="truncate">{item.name}</span>
                  )}
                  {item.current && (!sidebarCollapsed || isMobile) && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-2">
            {/* Settings */}
            <button
              className={`w-full group flex items-center px-3 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ${
                sidebarCollapsed && !isMobile
                  ? "justify-center px-2"
                  : "justify-start"
              }`}
            >
              <Settings
                className={`flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
                  sidebarCollapsed && !isMobile ? "w-6 h-6" : "w-5 h-5 mr-3"
                }`}
              />
              {(!sidebarCollapsed || isMobile) && (
                <span className="truncate">Settings</span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-full group flex items-center px-3 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 ${
                sidebarCollapsed && !isMobile
                  ? "justify-center px-2"
                  : "justify-start"
              }`}
            >
              <LogOut
                className={`flex-shrink-0 text-red-500 ${
                  sidebarCollapsed && !isMobile ? "w-6 h-6" : "w-5 h-5 mr-3"
                }`}
              />
              {(!sidebarCollapsed || isMobile) && (
                <span className="truncate">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
