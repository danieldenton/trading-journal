"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "./lib/actions/auth-actions";
import { useUserContext } from "./context/user";
import { User } from "./lib/types";

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState<User, {email?: string; password?: string }>(login, undefined);
  const { setUser } = useUserContext();

  if (state?.result && !isPending) {
    setUser(state.result); // Assuming `state.result` contains user information
  }

  return (
    <form
      action={loginAction}
      className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg border-4 border-red-600"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="m-2 p-1 rounded-lg border-black border-2"
      />

      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
        style={{
          color: "black",
        }}
      />

      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <button
        disabled={isPending}
        type="submit"
        className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2"
      >
        Login
      </button>
      <Link
        href="/register"
        className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2"
      >
        Create an Account
      </Link>
    </form>
  );
}
