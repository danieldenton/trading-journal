"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { Trigger } from "@/app/lib/types";
import { placeholderTriggers } from "@/app/lib/placeholders";

type TriggerContext = {
  triggers: Trigger[];
  setTriggers: React.Dispatch<React.SetStateAction<Trigger[]>>;
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
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [newTriggerName, setNewTriggerName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // TODO: This should be a GET call to the server.
    const triggersWithWinRate = placeholderTriggers
      .map((trigger) => ({
        ...trigger,
        winRate: calculateWinRate(trigger.successCount, trigger.failureCount),
      }))
      .sort((a, b) => b.winRate - a.winRate);
    setTriggers(triggersWithWinRate);
    // Make sire this is necessary.
    setIsLoaded(true);
  }, []);

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
      {isLoaded ? children : null}
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
