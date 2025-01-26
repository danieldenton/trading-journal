export type User = {
  id: number;
  email: string;
  first_name: string;
};

// login types
export type LoginSuccessResult = {
  success: true;
  user: User;
};

export type ZodLoginErrorResult = {
  success: false;
  errors: { email?: string[]; password?: string[] };
};

export type LoginErrorResult = {
  success: false;
  error: string;
};

export type LoginResult = LoginSuccessResult | ZodLoginErrorResult | LoginErrorResult |undefined

export type Trigger = {
  name: string;
  successCount: number;
  failureCount: number;
  winRate: number | undefined;
};
