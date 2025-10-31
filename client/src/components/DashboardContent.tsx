import { DollarSign, Users } from "lucide-react";
import StatsCard from "./StatsCard";
import UserTable from "./UserTable";

export default function DashboardContent() {
  const stats = [
    { title: "Total Users", value: 200, icon: Users, color: "blue" },
    { title: "Pending Verification", value: 56, icon: Users, color: "yellow" },
    { title: "Verified Users", value: 144, icon: Users, color: "green" },
    { title: "Total Deposits", value: "$45,678", icon: DollarSign, color: "green" },
    { title: "Total Withdrawals", value: "$12,345", icon: DollarSign, color: "red" },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
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