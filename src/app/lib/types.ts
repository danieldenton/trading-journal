import { Dispatch, SetStateAction } from "react";

// User
export type User = {
  id: number;
  email: string;
  first_name: string;
};

// Trigger
export type Trigger = {
  id: number;
  name: string;
  successCount: number;
  failureCount: number;
};

export type TriggerWithWinRate = Trigger & {
  winRate: number | undefined;
};

export type TriggerModalProps = {
  trigger: TriggerWithWinRate;
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};

// Trade
export type Trade = {
  id: number | undefined;
  date: string;
  symbol: string;
  setupIds: number[];
  triggerIds: number[];
  entry: Entry;
  takeProfits: TakeProfit[];
  exit: Exit; 
  mistakeIds: number[];
  notes: string;
  success: boolean;
  pnl: number;
};

export type Entry = {
  time: string;
  price: number | undefined;
  stop: number | undefined;
  takeProfits: number[];
  numOfContracts: number | undefined;
};

export type TakeProfit = {
  time: string;
  price: number | undefined;
  numOfContracts: number | undefined;
};

export type Exit = {
  time: string;
  price: number | undefined;
  totalPnl: number;
};

// Setup
export type Setup = {
  id: number;
  name: string;
  triggerIds: number[];
  successCount: number;
  failureCount: number;
};

export type SetupWithWinRate = Setup & {
  winRate: number | undefined;
};

export type SetupModalProps = {
  setup: SetupWithWinRate;
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};
