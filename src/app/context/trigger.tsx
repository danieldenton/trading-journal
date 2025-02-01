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

type TriggerContext = {
  triggers: TriggerWithWinRate[];
  setTriggers: Dispatch<SetStateAction<TriggerWithWinRate[]>>;
  newTriggerName: string;
  setNewTriggerName: Dispatch<SetStateAction<string>>;
  addNewTrigger: (prevState: any, formData: FormData) => void;

  patchAndSaveUpdatedTriggerToTriggers: (
    updatedTrigger: TriggerWithWinRate
  ) => void;
  deleteTriggerFromUser: (triggerId: number) => void;
};

export const TriggerContext = createContext<TriggerContext | undefined>(undefined);

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
    try {
      const userTriggers = await getTriggers(user?.id);
      const triggersWithWinRate = addWinRateToTriggers(userTriggers);
      setTriggers(triggersWithWinRate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTriggers();
    }
  }, [user?.id]);

  const addNewTrigger = async (prevState: any, formData: FormData) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to add a trigger");
        return "User needs to be logged in to add a trigger";
      }

      const newTrigger = await createTrigger(formData, user.id);
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
 
  const patchAndSaveUpdatedTriggerToTriggers = async (
    updatedTrigger: TriggerWithWinRate
  ) => {
    try {
      const returnedTrigger = await updateTrigger(updatedTrigger);
      if (typeof returnedTrigger === "object" && "id" in returnedTrigger) {
        const triggerWithWinRate = {
          ...returnedTrigger,
          winRate: calculateWinRate(
            returnedTrigger.successCount,
            returnedTrigger.failureCount
          ),
        };

        setTriggers((prevTriggers) =>
          prevTriggers.map((trigger) =>
            trigger.id === triggerWithWinRate.id ? triggerWithWinRate : trigger
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTriggerFromUser = async (triggerId: number) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to delete a trigger");
        return "User needs to be logged in to delete a trigger";
      }
      await deleteTrigger(triggerId, user.id);
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
