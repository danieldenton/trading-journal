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
