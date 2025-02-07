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
  deleteMistake,
} from "../lib/actions/mistake-actions";
import { useUserContext } from "./user";

type MistakeContext = {
  mistakes: Mistake[];
  setMistakes: Dispatch<SetStateAction<Mistake[]>>;
  newMistakeName: string;
  setNewMistakeName: Dispatch<SetStateAction<string>>;
  addNewMistake: (prevState: any, formData: FormData) => void;
  deleteMistakeFromUser: (mistakeId: number) => void;
  // postAndSaveUpdatedMistakeToMistakes: (updatedMistake: Mistake) => void;
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

  const fetchMistakes = async () => {
    try {
      if (!user?.id) return;
      const userMistakes = await getMistakes(user.id);
      if (!userMistakes) return;
      setMistakes(userMistakes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, [user?.id]);

  // const addNewMistake = async (prevState: any, formData: FormData) => {
  //   try {
  //     if (!user?.id) {
  //       console.error("User needs to be logged in to add a mistake");
  //       return "User needs to be logged in to add a mistake";
  //     }

  //     const newMistake = await createMistake(formData, user.id);
  //     if (newMistake?.errors) {
  //       return newMistake.errors.name?.[0];
  //     }

  //     if (typeof newMistake?.name === "string") {
  //       setMistakes((prev) => [
  //         ...prev,
  //         { id: newMistake.id, name: newMistake.name },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const postAndSaveUpdatedMistakeToMistakes = (updatedMistake: Mistake) => {
    setMistakes((prev) =>
      prev.map((mistake) =>
        mistake.id === updatedMistake.id ? updatedMistake : mistake
      )
    );
  };

  const deleteMistakeFromUser = async (mistakeId: number) => {
    try {
      if (!user?.id) {
        console.error("User needs to be logged in to delete a mistake");
        return "User needs to be logged in to delete a mistake";
      }
      await deleteMistake(mistakeId, user.id);
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
        deleteMistakeFromUser,
        // postAndSaveUpdatedMistakeToMistakes
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
