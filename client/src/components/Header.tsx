import { Bell } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { admin } = useAuthStore();

  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">{admin?.email || "Admin"}</p>
            <p className="text-xs text-gray-500">{admin?.role || "Administrator"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}