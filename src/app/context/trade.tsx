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
import { QueryResultRow } from "@vercel/postgres";

type TradeContext = {
  trades: Trade[];
  setSetupIds: Dispatch<SetStateAction<number[]>>;
  triggerIds: number[];
  setTriggerIds: Dispatch<SetStateAction<number[]>>;
  setMistakeIds: Dispatch<SetStateAction<number[]>>;
  setTakeProfits: Dispatch<SetStateAction<number[]>>;
  postTrade: (prevState: any, formData: FormData) => void;
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [setupIds, setSetupIds] = useState<number[]>([]);
  const [triggerIds, setTriggerIds] = useState<number[]>([]);
  const [mistakeIds, setMistakeIds] = useState<number[]>([]);
  const [takeProfits, setTakeProfits] = useState<number[]>([]);

  const { user } = useUserContext();

  const formatTradeReturn = (trade: QueryResultRow): Trade => {
    return {
      id: trade.id,
      date: trade.date,
      symbol: trade.symbol,
      long: trade.long,
      setupIds: trade.setup_ids,
      triggerIds: trade.trigger_ids,
      entryTime: trade.entry_time,
      entryPrice: trade.entry_price,
      numberOfContracts: trade.number_of_contracts,
      stop: trade.stop,
      takeProfits: trade.take_profits,
      exitTime: trade.exit_time,
      exitPrice: trade.exit_price,
      pnl: trade.pnl,
      mistakeIds: trade.mistake_ids,
      notes: trade.notes,
    };
  };

  const fetchTrades = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const trades = await getTrades(user.id);
      if (trades) {
        const formattedTrades = trades.map((trade) => formatTradeReturn(trade));
        setTrades(formattedTrades);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [user?.id]);

  const postTrade = async (prevState: any, formData: FormData) => {
    if (!user?.id) {
      console.error("User needs to be logged in to add a trade");
      return;
    }
    try {
      const newTrade = await createTrade(formData, user.id);
      if (newTrade?.errors) {
        console.log(newTrade.errors);
        return;
      }
      if (typeof newTrade === "object" && "id" in newTrade) {
        const formattedTrade = formatTradeReturn(newTrade);
        setTrades((prev) => [...prev, formattedTrade]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        setSetupIds,
        triggerIds,
        setTriggerIds,
        setMistakeIds,
        setTakeProfits,
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
