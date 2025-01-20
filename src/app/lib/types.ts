export type User = {
  id: number;
  email: string;
  first_name: string;
};

export type Trigger = {
  id: number;
  name: string;
  successCount: string;
  failureCount: number;
  user_id: number;
};
