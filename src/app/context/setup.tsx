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
import { Setup, SetupWithWinRate } from "../lib/types";
import { calculateWinRate } from "../lib/utils";
import { useUserContext } from "./user";

type SetupContext = {
  setups: SetupWithWinRate[];
  setSetups: Dispatch<SetStateAction<SetupWithWinRate[]>>;
  setup: Setup;
  setSetup: Dispatch<SetStateAction<Setup>>;
  addNewSetup: (prevState: any, formData: FormData) => void;
  patchAndSaveUpdatedSetupToSetups: (updatedSetup: SetupWithWinRate) => void;
  deleteSetupFromUser: (setupId: number) => void;
  addOrRemoveTriggerFromSetup: (add: boolean, triggerId: number) => void;
  selectedTriggerIds: number[];
  setSelectedTriggerIds: Dispatch<SetStateAction<number[]>>;
};

export const SetupContext = createContext<SetupContext | undefined>(undefined);

export default function SetupContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [setups, setSetups] = useState<SetupWithWinRate[]>([]);
  const [selectedTriggerIds, setSelectedTriggerIds] = useState<number[]>([]);
  const [setup, setSetup] = useState<Setup>({
    id: 0,
    name: "",
    triggerIds: selectedTriggerIds,
    successCount: 0,
    failureCount: 0,
  });
  const { user } = useUserContext();

  function addWinRateToSetups(
    setupsToUpdated: Setup[] | undefined
  ): SetupWithWinRate[] {
    const setupsWithWinRate = setupsToUpdated?.map((setup) => ({
      ...setup,
      winRate: calculateWinRate(setup.successCount, setup.failureCount),
    }));
    const sortedSetups =
      setupsWithWinRate?.sort((a, b) => b.winRate - a.winRate) || [];
    return sortedSetups;
  }

  const fetchSetups = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const userSetups = await getSetups(user.id);
      if (userSetups) {
        const setupsWithWinRate = addWinRateToSetups(userSetups);
        setSetups(setupsWithWinRate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSetups();
  }, [user?.id]);

  const addNewSetup = async (prevState: any, formData: FormData) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to add a setup");
        return "User needs to be logged in to add a setup";
      }

      formData.append("triggerIds", JSON.stringify(selectedTriggerIds));

      const newSetup = await createSetup(formData, user.id);
      if (newSetup?.errors) {
        const { name } = newSetup.errors;
        return name;
      }

      if (typeof newSetup?.id === "number" && newSetup.id > 0) {
        setSetups((prev) => [
          ...prev,
          {
            id: newSetup.id,
            name: newSetup.name,
            triggerIds: newSetup.setupIds,
            successCount: 0,
            failureCount: 0,
            winRate: 0,
          },
        ]);
        setSetup({
          id: 0,
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
    updatedSetup: SetupWithWinRate
  ) => {
    try {
      const returnedSetup = await updateSetup(updatedSetup);
      if (typeof returnedSetup === "object" && "id" in returnedSetup) {
        const setupWithWinRate = {
          ...returnedSetup,
          winRate: calculateWinRate(
            returnedSetup.successCount,
            returnedSetup.failureCount
          ),
        };

        setSetups((prevsetups) =>
          prevsetups.map((setup) =>
            setup.id === setupWithWinRate.id ? setupWithWinRate : setup
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
      setSelectedTriggerIds((prevState) => [...prevState, triggerId]);
    } else {
      setSelectedTriggerIds((prevState) =>
        prevState.filter((id) => id !== triggerId)
      );
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
        selectedTriggerIds,
        setSelectedTriggerIds,
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
