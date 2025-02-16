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
  setSelectedSetupIds: Dispatch<SetStateAction<number[]>>;
  setSelectedTriggerIds: Dispatch<SetStateAction<number[]>>;
  setSelectedMistakeIds: Dispatch<SetStateAction<number[]>>;
  setTakeProfits: Dispatch<SetStateAction<number[]>>;
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
  const [selectedSetupIds, setSelectedSetupIds] = useState<number[]>([]);
  const [selectedTriggerIds, setSelectedTriggerIds] = useState<number[]>([]);
  const [selectedMistakeIds, setSelectedMistakeIds] = useState<number[]>([]);
  const [takeProfits, setTakeProfits] = useState<number[]>([]);

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
      setSelectedTriggerIds((prevState) => [...prevState, triggerId]);
    } else {
      setSelectedTriggerIds((prevState) =>
        prevState.filter((id) => id !== triggerId)
      );
    }
  };

  const formatTradeReturn = (trade: QueryResultRow): Trade => {
    const formattedTrade = {
      id: trade.id,
      date: trade.date,
      symbol: trade.symbol,
      long: trade.long,
      setupIds: trade.setupIds,
      triggerIds: trade.triggerIds,
      entryTime: trade.entryTime,
      entryPrice: trade.entryPrice,
      numberOfContracts: trade.numberOfContracts,
      stop: trade.stop,
      takeProfits: trade.takeProfits,
      exitTime: trade.exitTime,
      exitPrice: trade.exitPrice,
      pnl: trade.pnl,
      mistakeIds: trade.mistakeIds,
      notes: trade.notes,
    };
    return formattedTrade;
  };

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
        setSelectedSetupIds,
        setSelectedTriggerIds,
        setSelectedMistakeIds,
        setTakeProfits,
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
