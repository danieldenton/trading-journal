"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { logout } from "../lib/actions/auth-actions";
import { User } from "../lib/types";
import { getUserIdFromSessionAndUserFromDb } from "../lib/actions/auth-actions";
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

  const fetchUser = async () => {
    const user = await getUserIdFromSessionAndUserFromDb();
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(undefined);
    logout();
    router.push("/");
  };

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
