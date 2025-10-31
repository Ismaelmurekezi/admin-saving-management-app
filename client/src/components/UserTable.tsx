import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "../services/api";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  deviceId: string;
  status: "pendingVerification" | "verified" | "rejected";
  balance: number;
}

interface UserTableProps {
  onUserUpdate?: () => void;
}

export default function UserTable({ onUserUpdate }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error: any) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDevice = async (deviceId: string, status: "verified" | "rejected") => {
    try {
      await adminAPI.verifyDevice(deviceId, status);
      toast.success(`Device ${status} successfully`);
      fetchUsers(); // Refresh the list
      onUserUpdate?.(); // Notify parent component
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update device status");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p>Loading users...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-700";
      case "pendingVerification": return "bg-yellow-100 text-yellow-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendingVerification": return "Pending";
      case "verified": return "Verified";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between my-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Actions
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NAME</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">EMAIL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">BALANCE</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">${user.balance.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyDevice(user.deviceId, "verified")}
                        disabled={user.status === "verified"}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleVerifyDevice(user.deviceId, "rejected")}
                        disabled={user.status === "rejected"}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Showing {users.length} of {users.length} results
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded bg-teal-600 text-white text-sm">1</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">2</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">3</button>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
