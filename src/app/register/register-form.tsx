"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/user";
import { registerUser } from "../lib/actions/auth-actions";

export default function RegisterForm() {
  const router = useRouter();
    const [state, registerAction, isPending] = useActionState(registerUser, undefined);
    const { setUser } = useUserContext();
  
    useEffect(() => {
      if (state?.user && !isPending) {
        setUser(state.user);
        router.push("/dashboard");
      }
    }, [state?.user]);

  return (
    <form
      action={registerAction}
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
        type="text"
        name="firstName"
        placeholder="First Name"
        className="m-2 p-1 rounded-lg border-black border-2 text-black"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />

      {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}
      <button
        disabled={isPending}
        type="submit"
        className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2"
      >
        Login
      </button>
    </form>
  );
}
