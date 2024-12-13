"use client";

import { useActionState } from "react";
// import SubmitButton from "./submit-button";
import { login } from "@/app/lib/actions";

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, undefined);
  return (
    <form action={loginAction}>
      <div>
        <input type="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}
      <div>
        <input type="password" name="password" placeholder="Password" />
      </div>
      {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}
      <button disabled={isPending} type="submit">
        Login
      </button>
    </form>
  );
}
