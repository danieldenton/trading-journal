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
  id: number;
  winRate: number | undefined;
};
export type TriggerModalProps = {
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
  trigger: TriggerWithWinRate;
};
export type Mistake = {
  id: number;
  name: string;
  onSuccessfulTrades: number;
  onFailedTrades: number;
};

export type MistakeModalProps = {
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
  mistake: Mistake;
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
