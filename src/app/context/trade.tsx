"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";


import { useUserContext } from "./user";

type TradeContext = {
  
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
 
  const { user } = useUserContext();


  useEffect(() => {
    if (user?.id) {
     
    }
  }, [user?.id]);

  
  return (
    <TradeContext.Provider
      value={{
        
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error(
      "useTradeContext must be used within a TradeContextProvider"
    );
  }
  return context;
};
