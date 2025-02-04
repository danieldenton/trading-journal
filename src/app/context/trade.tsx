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
  trade: Trade
  setTrade: Dispatch<SetStateAction<Trade>>;
  addOrRemoveTriggerFromTrade: (add: boolean, triggerId: number) => void;
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [trade, setTrade] = useState<Trade>({
    id: undefined,
    date: "",
    time: "",
    symbol: "",
    setupIds: [],
    triggerIds: [],
    mistakeIds: [],
    notes: "",
    success: false,
    pnl: 0,
  });

  const { user } = useUserContext();

  useEffect(() => {
    if (user?.id) {
    }
  }, [user?.id]);

  const addOrRemoveTriggerFromTrade = (add: boolean, triggerId: number) => {
    if (add) {
      setTrade((prevState) => {
        return {
          ...prevState,
          triggerIds: [...prevState.triggerIds, triggerId],
        };
      });
    } else {
      setTrade((prevState) => {
        return {
          ...prevState,
          triggerIds: prevState.triggerIds.filter((id) => id !== triggerId),
        };
      });
    }
  }

  return (
    <TradeContext.Provider
      value={{
        trades,
        setTrades,
        trade,
        setTrade,
        addOrRemoveTriggerFromTrade
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
