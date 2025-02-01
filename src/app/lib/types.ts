import { Dispatch, SetStateAction } from "react";

// User
export type User = {
  id: number;
  email: string;
  first_name: string;
};

// Trigger
export type Trigger = {
  id: number | undefined;
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
  time: string;
  symbol: string;
  setupIds: number[];
  triggerIds: number[];
  mistakeIds: number[];
  notes: string;
  success: boolean;
  pnl: number;
};

// Setup
export type Setup = {
  id: number | undefined;
  name: string;
  triggerIds: number[];
  successCount: number;
  failureCount: number;
};

export type SetupWithWinRate = Setup & {
  winRate: number | undefined;
};
