"use client";

import React from "react";
import { useUserContext } from "./context/user";

export default function LogoutButton() {
  const { handleLogout } = useUserContext()

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

