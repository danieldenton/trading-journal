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

import { Trade, TakeProfit } from "../lib/types";
import { useUserContext } from "./user";

type TradeContext = {
  trades: Trade[];
  setTakeProfit: Dispatch<SetStateAction<TakeProfit>>;
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
  // TODO: Probably remove this state from here and relocate it to the trade form.
  const [takeProfit, setTakeProfit] = useState({
    price: 0,
    numOfContracts: 0,
    targetReached: false,
  });
  
  const [trade, setTrade] = useState<Trade>({
    id: undefined,
    date: Date.now().toString(),
    symbol: "",
    long: true,
    setupIds: [],
    triggerIds: [],
    entryTime: "",
    entryPrice: 0,
    numberOfContracts: 0,
    stop: 0,
    takeProfits: [],
    exitTime: "",
    exitPrice: 0,
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
        setTakeProfit,
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
