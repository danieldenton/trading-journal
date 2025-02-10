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

import { Trade, Entry, TakeProfit, Exit } from "../lib/types";
import { useUserContext } from "./user";

type TradeContext = {
  trades: Trade[];
  setTrades: Dispatch<SetStateAction<Trade[]>>;
  setEntry: Dispatch<SetStateAction<Entry>>;
  trade: Trade;
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
  const [entry, setEntry] = useState({
    time: "",
    price: 0,
    stop: 0,
    numOfContracts: 0,
  });
  const [takeProfit, setTakeProfit] = useState({
    time: "",
    price: undefined,
    numOfContracts: undefined,
  });
  const [exit, setExit] = useState({
    time: "",
    price: undefined,
    totalPnl: 0,
  });
  const [trade, setTrade] = useState<Trade>({
    id: undefined,
    date: Date.now().toString(),
    symbol: "",
    buy: true,
    setupIds: [],
    triggerIds: [],
    entry: entry,
    takeProfits: [],
    exit: exit,
    mistakeIds: [],
    notes: "",
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
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        setTrades,
        setEntry,
        trade,
        setTrade,
        addOrRemoveTriggerFromTrade,
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
