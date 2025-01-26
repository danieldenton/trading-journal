"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type UserContext = {
  userId: number | undefined;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number | undefined>();
  //TODO make sure this below is necessary
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
      }}
    >
      {isLoaded ? children : null}
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
