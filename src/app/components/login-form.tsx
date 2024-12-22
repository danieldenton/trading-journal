"use client";

import { useActionState } from "react";
import Link from "next/link";
// import SubmitButton from "./submit-button";
import { login } from "@/app/lib/actions";

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg border-4 border-red-600">
      <div className="m-2">
        <input type="email" name="email" placeholder="Email" className="p-1 rounded-lg border-black border-2" />
      </div>
      {/* {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)} */}
      
      <div className="m-2">
        <input type="password" name="password" placeholder="Password" className="p-1 rounded-lg border-black border-2" />
      </div>
      {/* {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)} */}
      <button disabled={isPending} type="submit" className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2">
        Login
      </button>
      <Link href="/signup"className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2">
        Create an Account
      </Link>
    </form>
  );
}
