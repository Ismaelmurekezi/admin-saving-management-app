import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardContent from "../components/DashboardContent";
import User from "./User";
import Transaction from "./Transaction";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Welcome back, Bryan";
      case "users": return "User Management";
      case "transactions": return "Transaction Management";
      default: return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardContent />;
      case "users": return <User />;
      case "transactions": return <Transaction />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        <Header title={getTitle()} />
        <main className="p-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
