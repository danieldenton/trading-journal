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
  long: boolean | undefined;
  setupIds: number[];
  triggerIds: number[];
  entryTime: string;
  entryPrice: number;
  numberOfContracts: number;
  stop: number;
  takeProfits: number[];
  exitTime: string;
  exitPrice: number;
  pnl: number;
  mistakeIds: number[];
  notes: string;
};

// Setup
export type Setup = {
  id: number;
  name: string;
  triggerIds: number[];
  successCount: number;
  failureCount: number;
  winRate: number;
};

export type SetupModalProps = {
  setup: Setup;
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};
