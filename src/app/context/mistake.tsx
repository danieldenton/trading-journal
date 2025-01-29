"use client";

import React, { useState, useContext, createContext } from "react";

import { Mistake } from "../lib/types";
import { mistakePlaceholder } from "../lib/placeholders";

type MistakeContext = {
  mistakes: Mistake[];
  setMistakes: React.Dispatch<React.SetStateAction<Mistake[]>>;
  newMistakeName: string;
  setNewMistakeName: React.Dispatch<React.SetStateAction<string>>;
  addMistake: () => void;
};

export const MistakeContext = createContext<MistakeContext | null>(null);

export default function MistakeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [newMistakeName, setNewMistakeName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  //TODO: POST call to the server
  const addMistake = () => {
    if (newMistakeName.trim() !== "") {
      // createMistake(userId)
      setMistakes((prev) => [...prev]);
      setNewMistakeName("");
    }
  };

  return (
    <MistakeContext.Provider
      value={{
        mistakes,
        setMistakes,
        newMistakeName,
        setNewMistakeName,
        addMistake,
      }}
    >
      {isLoaded ? children : null}
    </MistakeContext.Provider>
  );
}

export const useMistakeContext = () => {
  const context = useContext(MistakeContext);
  if (!context) {
    throw new Error(
      "useMistakeContext must be used within a MistakeContextProvider"
    );
  }
  return context;
};
