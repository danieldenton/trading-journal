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

import {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
} from "../lib/actions/trade-actions";
import { Trade } from "../lib/types";
import { useUserContext } from "./user";
import { QueryResultRow } from "@vercel/postgres";
import { error } from "console";

type TradeContext = {
  trades: Trade[];
  longOrShort: "long" | "short" | undefined;
  setLongOrShort: Dispatch<SetStateAction<"long" | "short" | undefined>>;
  setupIds: number[];
  setSetupIds: Dispatch<SetStateAction<number[]>>;
  triggerIds: number[];
  setTriggerIds: Dispatch<SetStateAction<number[]>>;
  setMistakeIds: Dispatch<SetStateAction<number[]>>;
  takeProfits: number[];
  setTakeProfits: Dispatch<SetStateAction<number[]>>;
  postTrade: (prevState: any, formData: FormData) => void;
  patchAndSaveUpdatedTradeToTrades: (updatedTrade: Trade) => void;
  deleteTradeFromDb: (tradeId: number) => void;
  calculateRiskReward: (trade: Trade) => {
    actualRisk: number;
    actualReward: number;
    riskReward: number;
  };
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export const TradeContext = createContext<TradeContext | undefined>(undefined);

export default function TradeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [longOrShort, setLongOrShort] = useState<"long" | "short" | undefined>(
    undefined
  );
  const [setupIds, setSetupIds] = useState<number[]>([]);
  const [triggerIds, setTriggerIds] = useState<number[]>([]);
  const [mistakeIds, setMistakeIds] = useState<number[]>([]);
  const [takeProfits, setTakeProfits] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

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

  const calculateRiskReward = (trade: Trade) => {
    const { entryPrice, stop, takeProfits, long, numberOfContracts } = trade;
    const risk = long ? entryPrice - stop : stop - entryPrice;
    const reward = long
      ? takeProfits[0] - entryPrice
      : entryPrice - takeProfits[0];
    const riskRewardRatio = reward / risk;
    const actualRisk = (risk / 25) * 100 * numberOfContracts;
    const actualReward = (reward / 25) * 100 * numberOfContracts;
    return {
      actualRisk,
      actualReward,
      riskReward: Math.round(riskRewardRatio * 100) / 100,
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
      console.log("User needs to be logged in to add a trade");
      return;
    }
    if (!longOrShort) {
      setError("Please select long or short");
      console.log("Please select long or short");
      return;
    }
    formData.append("userId", user.id.toString());
    formData.append("date", new Date().toISOString());
    formData.append("setupIds", JSON.stringify(setupIds));
    formData.append("triggerIds", JSON.stringify(triggerIds));
    formData.append("takeProfits", JSON.stringify(takeProfits));
    formData.append("mistakeIds", JSON.stringify(mistakeIds));
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

  const patchAndSaveUpdatedTradeToTrades = async (updatedTrade: Trade) => {
    try {
      const returnedTrade = await updateTrade(updatedTrade);
      if (typeof returnedTrade === "object" && "id" in returnedTrade) {
        const formattedTrade = formatTradeReturn(returnedTrade);
        setTrades((prevTrades) =>
          prevTrades.map((trade) =>
            trade.id === formattedTrade.id ? formattedTrade : trade
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTradeFromDb = async (tradeId: number) => {
    try {
      await deleteTrade(tradeId);
      setTrades((prev) => prev.filter((trade) => trade.id !== tradeId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        longOrShort,
        setLongOrShort,
        setupIds,
        setSetupIds,
        triggerIds,
        setTriggerIds,
        setMistakeIds,
        takeProfits,
        setTakeProfits,
        postTrade,
        patchAndSaveUpdatedTradeToTrades,
        deleteTradeFromDb,
        calculateRiskReward,
        error,
        setError
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
