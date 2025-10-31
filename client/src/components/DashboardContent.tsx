import { DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "../services/api";
import { toast } from "react-toastify";
import StatsCard from "./StatsCard";
import UserTable from "./UserTable";

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  verifiedUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

export default function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">Failed to load dashboard stats</div>
      </div>
    );
  }

  const statsCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "blue" },
    { title: "Pending Verification", value: stats.pendingUsers, icon: Users, color: "yellow" },
    { title: "Verified Users", value: stats.verifiedUsers, icon: Users, color: "green" },
    { title: "Total Deposits", value: `$${stats.totalDeposits.toLocaleString()}`, icon: DollarSign, color: "green" },
    { title: "Total Withdrawals", value: `$${stats.totalWithdrawals.toLocaleString()}`, icon: DollarSign, color: "red" },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Users Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-4">Recent Users</h3>
        <UserTable />
      </div>
    </div>
  );
}