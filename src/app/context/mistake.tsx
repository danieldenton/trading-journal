"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { Mistake } from "../lib/types";
import {
  createMistake,
  getMistakes,
  updateMistake,
  deleteMistake,
} from "../lib/actions/mistake-actions";
import { useUserContext } from "./user";
import { QueryResultRow } from "@vercel/postgres";

type MistakeContext = {
  mistakes: Mistake[];
  setMistakes: Dispatch<SetStateAction<Mistake[]>>;
  newMistakeName: string;
  setNewMistakeName: Dispatch<SetStateAction<string>>;
  addNewMistake: (prevState: Mistake[], formData: FormData) => void;
  deleteMistakeFromDb: (mistakeId: number) => void;
  patchAndSaveUpdatedMistakeToMistakes: (updatedMistake: Mistake) => void;
};

export const MistakeContext = createContext<MistakeContext | undefined>(
  undefined
);

export default function MistakeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [newMistakeName, setNewMistakeName] = useState("");
  const { user } = useUserContext();

  const formatMistakeReturn = (mistake: QueryResultRow): Mistake => {
    return {
      id: mistake.id,
      name: mistake.name,
      onSuccessfulTrades: mistake.on_successful_trades,
      onFailedTrades: mistake.on_failed_trades,
    };
  };

  const fetchMistakes = async () => {
    try {
      if (!user?.id) return;
      const userMistakes = await getMistakes(user.id);
      if (!userMistakes) return;
      const formattedMistakes = userMistakes.map((mistake) =>
        formatMistakeReturn(mistake)
      );
      setMistakes(formattedMistakes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, [user?.id]);

  const addNewMistake = async (prevState: any, formData: FormData) => {
    if (!user?.id) {
      console.log("User needs to be logged in to add a mistake");
      return;
    }

    try {
      const newMistake = await createMistake(formData, user.id);
      if (newMistake?.errors) {
        console.log(newMistake.errors);
        return;
      }

      if (typeof newMistake === "object" && "id" in newMistake) {
        const formattedMistake = formatMistakeReturn(newMistake);
        setMistakes((prev) => [...prev, formattedMistake]);
      }
    } catch (error) {
      console.log("Error adding new mistake:", error);
    }
  };

  const patchAndSaveUpdatedMistakeToMistakes = async (
    mistakeToUpdate: Mistake
  ) => {
    const updatedMistake = await updateMistake(mistakeToUpdate);
    if (typeof updatedMistake === "object" && "id" in updatedMistake) {
      const formattedMistake = formatMistakeReturn(updatedMistake);
      setMistakes((prev) =>
        prev.map((mistake) =>
          mistake.id === formattedMistake.id ? formattedMistake : mistake
        )
      );
    }
  };

  const deleteMistakeFromDb = async (mistakeId: number) => {
    try {
      if (!user?.id) {
        console.log("User needs to be logged in to delete a mistake");
        return;
      }
      await deleteMistake(mistakeId);
      setMistakes((prev) => prev.filter((mistake) => mistake.id !== mistakeId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MistakeContext.Provider
      value={{
        mistakes,
        setMistakes,
        newMistakeName,
        setNewMistakeName,
        addNewMistake,
        deleteMistakeFromDb,
        patchAndSaveUpdatedMistakeToMistakes,
      }}
    >
      {children}
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
