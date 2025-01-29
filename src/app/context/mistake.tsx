"use client";

import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";

import { Mistake } from "../lib/types";
import {
  createMistake,
  getMistake,
  updateMistake,
  deleteMistake,
} from "../lib/actions/mistake-actions";
import { UserContext, useUserContext } from "./user";

type MistakeContext = {
  mistakes: Mistake[];
  setMistakes: Dispatch<SetStateAction<Mistake[]>>;
  newMistakeName: string;
  setNewMistakeName: Dispatch<SetStateAction<string>>;
  addMistake: (prevState: any, formData: FormData) => void;
  deleteMistakeFromUser: (mistakeId: number) => void;
  postAndSaveUpdatedMistakeToMistakes: (updatedMistake: Mistake) => void;
};

export const MistakeContext = createContext<MistakeContext | null>(null);

export default function MistakeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [newMistakeName, setNewMistakeName] = useState("");
  const { user } = useUserContext();

  const fetchMistakes = async () => {
    try {
      const userMistakes = await getMistake(user?.id);
      setMistakes(Mistake);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMistakes();
    }
  }, [user?.id]);

  const addNewMistake = async (prevState: any, formData: FormData) => {
    try {
      if (!user?.id) {
        console.error("User need to be logged in to add a mistake");
        return "User needs to be logged in to add a mistake";
      }

      const newMistake = await createMistake(formData, user.id);
      if (newMistake?.errors) {
        const { name } = newMistake.errors;
        return name[0];
      }

      if (typeof newMistake?.name === "string") {
        setMistakes((prev) => [
          ...prev,
          {
            id: newMistake.id,
            name: newMistake.name,
          },
        ]);
      }
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
