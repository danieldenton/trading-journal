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

import { Trigger, TriggerWithWinRate } from "../lib/types";
import {
  createTrigger,
  getTriggers,
  updateTrigger,
  deleteTrigger,
} from "../lib/actions/trigger-actions";
import { calculateWinRate } from "../lib/utils";
import { useUserContext } from "./user";
import { QueryResultRow } from "@vercel/postgres";

type TriggerContext = {
  triggers: TriggerWithWinRate[];
  setTriggers: Dispatch<SetStateAction<TriggerWithWinRate[]>>;
  newTriggerName: string;
  setNewTriggerName: Dispatch<SetStateAction<string>>;
  addNewTrigger: (prevState: any, formData: FormData) => void;

  patchAndSaveUpdatedTriggerToTriggers: (
    updatedTrigger: TriggerWithWinRate
  ) => void;
  deleteTriggerFromDb: (triggerId: number) => void;
};

export const TriggerContext = createContext<TriggerContext | undefined>(
  undefined
);

export default function TriggerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [triggers, setTriggers] = useState<TriggerWithWinRate[]>([]);
  const [newTriggerName, setNewTriggerName] = useState("");
  const { user } = useUserContext();

  function addWinRateToTriggers(
    triggersToUpdated: Trigger[] | undefined
  ): TriggerWithWinRate[] {
    const triggersWithWinRate = triggersToUpdated?.map((trigger) => ({
      ...trigger,
      winRate: calculateWinRate(trigger.successCount, trigger.failureCount),
    }));
    const sortedTriggers =
      triggersWithWinRate?.sort((a, b) => b.winRate - a.winRate) || [];
    return sortedTriggers;
  }

  const fetchTriggers = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const userTriggers = await getTriggers(user.id);
      if (userTriggers) {
        const formattedTriggers = formatTriggerReturn(userTriggers);
        const sortedTriggers =
        formattedTriggers?.sort((a, b) => b.winRate - a.winRate) || [];
        setTriggers(sortedTriggers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, [user?.id]);

  const formatTriggerReturn = (trigger: QueryResultRow): TriggerWithWinRate => {
    return {
      id: trigger.id,
      name: trigger.name,
      successCount: trigger.success_count,
      failureCount: trigger.failure_count,
      winRate: calculateWinRate(trigger.success_count, trigger.failure_count),
    };
  };

  const addNewTrigger = async (prevState: any, formData: FormData) => {
    if (!user?.id) {
      console.error("User needs to be logged in to add a trigger");
      return;
    }
    try {
      const newTrigger = await createTrigger(formData, user.id);
      if (newTrigger?.errors) {
        const { name } = newTrigger.errors;
        return name[0];
      }

      if (typeof newTrigger === "object" && "id" in newTrigger) {
        const formattedTrigger = formatTriggerReturn(newTrigger);
        setTriggers((prev) => [...prev, formattedTrigger]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const patchAndSaveUpdatedTriggerToTriggers = async (
    updatedTrigger: TriggerWithWinRate
  ) => {
    try {
      const returnedTrigger = await updateTrigger(updatedTrigger);
      if (typeof returnedTrigger === "object" && "id" in returnedTrigger) {
        const formattedTrigger = formatTriggerReturn(returnedTrigger);
        setTriggers((prevTriggers) =>
          prevTriggers.map((trigger) =>
            trigger.id === formattedTrigger.id ? formattedTrigger : trigger
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTriggerFromDb = async (triggerId: number) => {
    try {
      await deleteTrigger(triggerId);
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
        patchAndSaveUpdatedTriggerToTriggers,
        deleteTriggerFromDb,
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
