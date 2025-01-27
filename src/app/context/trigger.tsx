"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { Trigger, TriggerWithWinRate } from "../lib/types";
import { createTrigger, getTriggers } from "../lib/actions/trigger-actions";
import { useUserContext } from "./user";
import { set } from "zod";

type TriggerContext = {
  triggers: TriggerWithWinRate[];
  setTriggers: React.Dispatch<React.SetStateAction<TriggerWithWinRate[]>>;
  newTriggerName: string;
  setNewTriggerName: React.Dispatch<React.SetStateAction<string>>;
  addTrigger: () => void;
};

export const TriggerContext = createContext<TriggerContext | null>(null);

export default function TriggerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [triggers, setTriggers] = useState<TriggerWithWinRate[]>([]);
  const [newTriggerName, setNewTriggerName] = useState("");
  const { user } = useUserContext();
  const id = user?.id;

  const fetchTriggers = async () => {
    try {
      const userTriggers = await getTriggers(id);
      const triggersWithWinRate = userTriggers?.map((trigger) => ({
        name: trigger.name,
        successCount: trigger.success_count,
        failureCount: trigger.failure_count,
        winRate: calculateWinRate(trigger.success_count, trigger.failure_count),
      }));
      const sortedTriggers =
        triggersWithWinRate?.sort((a, b) => b.winRate - a.winRate) || [];
      setTriggers(sortedTriggers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, [id]);

  function calculateWinRate(
    successCount: number,
    failureCount: number
  ): number {
    const total = successCount + failureCount;
    return total > 0 ? Math.round((successCount / total) * 100) : 0;
  }

  // TODO: This should be a POST call to the server.
  const addTrigger = () => {
    if (newTriggerName.trim() !== "") {
      // createTrigger(userId)
      setTriggers((prev) => [
        ...prev,
        { name: newTriggerName, successCount: 0, failureCount: 0, winRate: 0 },
      ]);
      setNewTriggerName("");
    }
  };

  return (
    <TriggerContext.Provider
      value={{
        triggers,
        setTriggers,
        newTriggerName,
        setNewTriggerName,
        addTrigger,
      }}
    >
      {children}
    </TriggerContext.Provider>
  );
}

export const useTriggerContext = () => {
  const context = useContext(TriggerContext);
  if (!context) {
    throw new Error(
      "useTriggerContext must be used within a TriggerContextProvider"
    );
  }
  return context;
};
