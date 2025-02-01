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

import { Setup, SetupWithWinRate } from "../lib/types";
import { calculateWinRate } from "../lib/utils";
import { useUserContext } from "./user";

type SetupContext = {
  setups: SetupWithWinRate[];
  setSetups: Dispatch<SetStateAction<SetupWithWinRate[]>>;
  setup: Setup;
  setSetup: Dispatch<SetStateAction<Setup>>;
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

  useEffect(() => {
    if (user?.id) {
    }
  }, [user?.id]);

  return (
    <SetupContext.Provider
      value={{
        setups,
        setSetups,
        setup,
        setSetup,
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
