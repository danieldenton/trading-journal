"use client";

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../lib/actions/auth-actions";
import { User } from "../lib/types";

type UserContext = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  handleLogout: () => void;
};

export const UserContext = createContext<UserContext | undefined>(undefined);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log("savedUser", savedUser);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {  
    setUser(undefined);
    localStorage.removeItem("user");
    logout();
    router.push("/");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
