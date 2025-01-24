"use client";

import { logout } from "../lib/actions/auth-actions";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

