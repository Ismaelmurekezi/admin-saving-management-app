import { Bell, DollarSign, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Transaction from "../pages/Transaction";

// Admin Dashboard
const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-700">USeve</h1>
        </div>

        <nav className="flex-1 px-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeTab === "dashboard"
                ? "bg-sky-100 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeTab === "users"
                ? "bg-sky-100 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activeTab === "transactions"
                ? "bg-sky-100 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Transactions</span>
          </button>
        </nav>

        <button className="flex items-center gap-3 px-8 py-4 text-red-600 hover:bg-red-50 m-4 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard" && "Welcome back"}
            {activeTab === "users" && "User Management"}
            {activeTab === "transactions" && "Transaction Management"}
          </h2>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <div>
                <p className="font-medium text-sm">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "users" && <User />}
        {activeTab === "transactions" && <Transaction />}
      </div>
    </div>
  );
};
export default Layout;
