"use client";

import { useActionState } from "react";
// import SubmitButton from "./submit-button";
import { registerUser } from "@/app/lib/actions";

export default function RegisterForm() {
  const [state, registerAction, isPending] = useActionState(
    registerUser,
    undefined
  );
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
        className="m-2 p-1 rounded-lg border-black border-2"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="m-2 p-1 rounded-lg border-black border-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="m-2 p-1 rounded-lg border-black border-2"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="p-1 rounded-lg border-black border-2"
      />

      {/* {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)} */}
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
