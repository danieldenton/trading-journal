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

import { getTrades, createTrade } from "../lib/actions/trade-actions";
import { Trade } from "../lib/types";
import { useUserContext } from "./user";

type TradeContext = {
  trades: Trade[];
  trade: Trade;
  setTrade: Dispatch<SetStateAction<Trade>>;
  addOrRemoveTriggerFromTrade: (add: boolean, triggerId: number) => void;
  postTrade: (prevState: any, formData: FormData) => void;
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trades, setTrades] = useState<Trade[]>([]);
  // TODO: Probably remove this state from here and relocate it to the trade form.

  const [trade, setTrade] = useState<Trade>({
    id: undefined,
    date: "",
    symbol: "",
    long: undefined,
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

  const fetchTrades = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const trades = await getTrades(user.id);
      if (trades) {
        setTrades(trades);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrades();
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

  const postTrade = async (prevState: any, formData: FormData) => {
    if (!user?.id) {
      console.error("User needs to be logged in to add a trade");
      return;
    }
    try {
      const newTrade = await createTrade(formData, user.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        trade,
        setTrade,
        addOrRemoveTriggerFromTrade,
        postTrade,
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
