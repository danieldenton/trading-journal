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

  // TODO make sure a trade state is necessary at all.
  // const resetTrade = () => {
  //   setTrade({
  //     id: undefined,
  //     date: "",
  //     symbol: "",
  //     long: undefined,
  //     setupIds: [],
  //     triggerIds: [],
  //     entryTime: "",
  //     entryPrice: 0,
  //     numberOfContracts: 0,
  //     stop: 0,
  //     takeProfits: [],
  //     exitTime: "",
  //     exitPrice: 0,
  //     pnl: 0,
  //     mistakeIds: [],
  //     notes: "",
  //   });
  // }

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
        // resetTrade();
      }
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
