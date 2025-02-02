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
  getSetups,
  createSetup,
  updateSetup,
  deleteSetup,
} from "../lib/actions/setup-actions";
import { Setup, SetupWithWinRateAndTriggers } from "../lib/types";
import { calculateWinRate } from "../lib/utils";
import { useUserContext } from "./user";
import { useTriggerContext } from "./trigger";

type SetupContext = {
  setups: SetupWithWinRateAndTriggers[];
  setSetups: Dispatch<SetStateAction<SetupWithWinRateAndTriggers[]>>;
  setup: Setup;
  setSetup: Dispatch<SetStateAction<Setup>>;
  addNewSetup: (prevState: any, formData: FormData) => void;
  patchAndSaveUpdatedSetupToSetups: (
    updatedSetup: SetupWithWinRateAndTriggers
  ) => void;
  deleteSetupFromUser: (setupId: number) => void;
  addOrRemoveTriggerFromSetup: (add: boolean, triggerId: number) => void;
};

export const SetupContext = createContext<SetupContext | undefined>(undefined);

export default function SetupContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [setups, setSetups] = useState<SetupWithWinRateAndTriggers[]>([]);
  const [setup, setSetup] = useState<Setup>({
    id: undefined,
    name: "",
    triggerIds: [],
    successCount: 0,
    failureCount: 0,
  });
  const { user } = useUserContext();
  const { triggers } = useTriggerContext();

  function getTriggerNames(triggerIds: number[]) {
    const triggerNames = triggers.map((trigger) => {
      if (triggerIds.includes(trigger.id)) {
        return trigger.name;
      }
    });
    return triggerNames;
  }

  function addWinRateAndTriggerNamesToSetups(
    setupsToBeUpdated: Setup[]
  ): SetupWithWinRateAndTriggers[] {
    const setupsWithWinRateAndTriggerNames = setupsToBeUpdated?.map(
      (setup) => ({
        id: setup.id,
        name: setup.name,
        triggerNames: getTriggerNames(setup.triggerIds),
        successCount: setup.successCount,
        failureCount: setup.failureCount,
        winRate: calculateWinRate(setup.successCount, setup.failureCount),
      })
    );
    const sortedSetups =
      setupsWithWinRateAndTriggerNames?.sort((a, b) => b.winRate - a.winRate) ||
      [];
    return sortedSetups;
  }

  const fetchSetups = async () => {
    try {
      const userSetups = await getSetups(user?.id);
      if (userSetups) {
        const setupsWithWinRate = addWinRateAndTriggerNamesToSetups(userSetups);
        setSetups(setupsWithWinRate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSetups();
    }
  }, [user?.id]);

  const addNewSetup = async (prevState: any, formData: FormData) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to add a setup");
        return "User needs to be logged in to add a setup";
      }

      formData.append("triggerIds", JSON.stringify(setup.triggerIds));

      const newSetup = await createSetup(formData, user.id);
      if (newSetup?.errors) {
        const { name } = newSetup.errors;
        return name;
      }

      if (typeof newSetup?.name === "string") {
        setSetups((prev) => [
          ...prev,
          {
            id: newSetup.id,
            name: newSetup.name,
            triggerNames: newSetup.setupIds,
            successCount: 0,
            failureCount: 0,
            winRate: 0,
          },
        ]);
        setSetup({
          id: undefined,
          name: "",
          triggerIds: [],
          successCount: 0,
          failureCount: 0,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const patchAndSaveUpdatedSetupToSetups = async (
    updatedSetup: SetupWithWinRateAndTriggers
  ) => {
    try {
      const returnedSetup = await updateSetup(updatedSetup);
      if (typeof returnedSetup === "object" && "id" in returnedSetup) {
        const formattedSetup = {
          id: returnedSetup.id,
          name: returnedSetup.name,
          triggerNames: getTriggerNames(returnedSetup.triggerIds),
          successCount: returnedSetup.successCount,
          failureCount: returnedSetup.failureCount,
          winRate: calculateWinRate(
            returnedSetup.successCount,
            returnedSetup.failureCount
          ),
        };

        setSetups((prevsetups) =>
          prevsetups.map((setup) =>
            setup.id === formattedSetup.id ? formattedSetup : setup
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSetupFromUser = async (setupId: number) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to delete a setup");
        return "User needs to be logged in to delete a setup";
      }
      await deleteSetup(setupId, user.id);
      setSetups((prev) => prev.filter((setup) => setup.id !== setupId));
    } catch (error) {
      console.error(error);
    }
  };

  const addOrRemoveTriggerFromSetup = (add: boolean, triggerId: number) => {
    if (add) {
      setSetup((prevState) => {
        return {
          ...prevState,
          triggerIds: [...prevState.triggerIds, triggerId],
        };
      });
    } else {
      setSetup((prevState) => {
        return {
          ...prevState,
          triggerIds: prevState.triggerIds.filter((id) => id !== triggerId),
        };
      });
    }
  };

  return (
    <SetupContext.Provider
      value={{
        setups,
        setSetups,
        setup,
        setSetup,
        addNewSetup,
        patchAndSaveUpdatedSetupToSetups,
        deleteSetupFromUser,
        addOrRemoveTriggerFromSetup,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
}

export const useSetupContext = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error(
      "useSetupContext must be used within a SetupContextProvider"
    );
  }
  return context;
};
