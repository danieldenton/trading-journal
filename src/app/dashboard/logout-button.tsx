"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/actions/auth-actions";
import { useUserContext } from "../context/user";

export default function LogoutButton() {
  const router = useRouter();
  const { setUser } = useUserContext();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

