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
          <div>
            <p className="font-medium text-sm">{admin?.email || "Admin"}</p>
            <p className="text-xs text-gray-500">{admin?.role || "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}