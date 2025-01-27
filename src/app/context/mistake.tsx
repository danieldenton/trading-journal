"use client";

import React, { useState, useEffect, useContext, createContext } from "react";

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
const [mistakes, setMistakes] = useState<Trigger[]>([]);

)