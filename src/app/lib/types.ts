export type User = {
  id: number;
  email: string;
  first_name: string;
};

export type ZodLoginErrorResult = {
  errors: { email?: string[] | undefined; password?: string[] | undefined };
};

export type LoginErrorResult = { error: string };

export type Trigger = {
  name: string;
  successCount: number;
  failureCount: number;
  winRate: number | undefined;
};
