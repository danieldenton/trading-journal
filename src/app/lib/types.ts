import { Dispatch, SetStateAction } from "react";

export type User = {
  id: number;
  email: string;
  first_name: string;
};

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

export type Trade = {
  id: number | undefined
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

export type Setup = {
  id: number | undefined
  name: string;
  triggerIds: number[];
};
