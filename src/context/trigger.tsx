"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { Trigger } from "@/app/lib/types";

type TriggerContext = {
  triggers: Trigger[];
  setTriggers: React.Dispatch<React.SetStateAction<Trigger[]>>;
  
};

export const TriggerContext = createContext<TriggerContext | null>(null);

export default function TriggerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  

  return (
    <TriggerContext.Provider value={{ triggers, setTriggers }}>
      {isLoaded ? children : null}
    </TriggerContext.Provider>
  );
}

export const useTriggerContext = () => {
  const context = useContext(TriggerContext);
  if (!context) {
    throw new Error("useTriggerContext must be used within a TriggerContextProvider");
  }
  return context;
};
