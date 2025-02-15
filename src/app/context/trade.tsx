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
  setTakeProfit: Dispatch<SetStateAction<TakeProfit>>;
  setExit: Dispatch<SetStateAction<Exit>>;
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
    price: 0,
    numOfContracts: 0,
  });
  const [exit, setExit] = useState({
    time: "",
    price: 0,
  });
  const [trade, setTrade] = useState<Trade>({
    id: undefined,
    date: Date.now().toString(),
    symbol: "",
    long: true,
    setupIds: [],
    triggerIds: [],
    entry: entry,
    takeProfits: [],
    exit: exit,
    pnl: 0,
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
        setTakeProfit,
        setExit,
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
