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
};

export const SetupContext = createContext<SetupContext | undefined>(undefined);

export default function SetupContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [setups, setSetups] = useState<SetupWithWinRate[]>([]);
  const [setup, setSetup] = useState<Setup>({
    id: undefined,
    name: "",
    triggerIds: [],
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
    try {
      const userSetups = await getSetups(user?.id);
      const setupsWithWinRate = addWinRateToSetups(userSetups);
      setSetups(setupsWithWinRate);
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

      const newSetup = await createSetup(formData, user.id);
      if (newSetup?.errors) {
        const { name } = newSetup.errors;
        return name[0];
      }

      if (typeof newSetup?.name === "string") {
        setSetups((prev) => [
          ...prev,
          {
            id: newSetup.id,
            name: newSetup.name,
            triggerIds: newSetup.triggerIds,
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

  return (
    <SetupContext.Provider
      value={{
        setups,
        setSetups,
        setup,
        setSetup,
        addNewSetup,
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
