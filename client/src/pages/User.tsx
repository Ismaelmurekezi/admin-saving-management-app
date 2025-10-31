import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "../services/api";
import UserTable from "../components/UserTable";
import StatsCard from "../components/StatsCard";

interface User {
  _id: string;
  name: string;
  email: string;
  status: "pendingVerification" | "verified" | "rejected";
  balance: number;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const pendingUsers = users.filter(user => user.status === "pendingVerification").length;
  const verifiedUsers = users.filter(user => user.status === "verified").length;
  const rejectedUsers = users.filter(user => user.status === "rejected").length;

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Users" value={totalUsers} icon={Users} color="blue" />
        <StatsCard title="Pending Verification" value={pendingUsers} icon={Users} color="yellow" />
        <StatsCard title="Verified Users" value={verifiedUsers} icon={Users} color="green" />
        <StatsCard title="Rejected Users" value={rejectedUsers} icon={Users} color="red" />
      </div>

      {/* Users Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-4">All Users</h3>
        <UserTable />
      </div>
    </div>
  );
}

