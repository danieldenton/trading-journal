import { Dispatch, SetStateAction } from "react";

export type User = {
  id: number;
  email: string;
  first_name: string;
};

export type Trigger = {
  name: string;
  successCount: number;
  failureCount: number;
  winRate: number | undefined;
};
export type TriggerModalProps = {
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};
export type Mistake = {
  name: string;
};

export type MistakeModalProps = {
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};
