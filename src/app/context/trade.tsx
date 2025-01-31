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

import { Trade } from "../lib/types";
import { useUserContext } from "./user";

type TradeContext = {
  trades: Trade[];
  setTrades: Dispatch<SetStateAction<Trade[]>>;
  trade: Trade | undefined;
  setTrade: Dispatch<SetStateAction<Trade | undefined>>;
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [trade, setTrade] = useState<Trade | undefined>(undefined);

  const { user } = useUserContext();

  useEffect(() => {
    if (user?.id) {
    }
  }, [user?.id]);

  return (
    <TradeContext.Provider
      value={{
        trades,
        setTrades,
        trade,
        setTrade,
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
