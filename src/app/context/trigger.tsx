"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { TriggerWithWinRate } from "../lib/types";
import {
  createTrigger,
  getTriggers,
  deleteTrigger,
} from "../lib/actions/trigger-actions";
import { useUserContext } from "./user";

type TriggerContext = {
  triggers: TriggerWithWinRate[];
  setTriggers: React.Dispatch<React.SetStateAction<TriggerWithWinRate[]>>;
  newTriggerName: string;
  setNewTriggerName: React.Dispatch<React.SetStateAction<string>>;
  addNewTrigger: (prevState: any, formData: FormData) => void;
  deleteTriggerFromUser: (triggerId: number) => void;
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

  function calculateWinRate(
    successCount: number,
    failureCount: number
  ): number {
    const total = successCount + failureCount;
    return total > 0 ? Math.round((successCount / total) * 100) : 0;
  }

  const fetchTriggers = async () => {
    try {
      const userTriggers = await getTriggers(id);
      const triggersWithWinRate = userTriggers?.map((trigger) => ({
        id: trigger.id,
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
    if (id) {
      fetchTriggers();
    }
  }, [id]);

  const addNewTrigger = async (prevState: any, formData: FormData) => {
    try {
      if (!id) {
        console.error("User needs to be logged in to add a trigger");
        return "User needs to be logged in to add a trigger";
      }

      const newTrigger = await createTrigger(formData, id);
      if (newTrigger?.errors) {
        const { name } = newTrigger.errors;
        return name[0];
      }

      if (typeof newTrigger?.name === "string") {
        setTriggers((prev) => [
          ...prev,
          {
            id: newTrigger.id,
            name: newTrigger.name,
            successCount: 0,
            failureCount: 0,
            winRate: 0,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTriggerFromUser = async (triggerId: number) => {
    try {
      if (!id) {
        console.error("User needs to be logged in to delete a trigger");
        return "User needs to be logged in to delete a trigger";
      }
      await deleteTrigger(triggerId, id);
      setTriggers((prev) => prev.filter((trigger) => trigger.id !== triggerId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TriggerContext.Provider
      value={{
        triggers,
        setTriggers,
        newTriggerName,
        setNewTriggerName,
        addNewTrigger,
        deleteTriggerFromUser,
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
