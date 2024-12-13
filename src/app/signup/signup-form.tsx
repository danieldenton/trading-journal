"use client";

import { useActionState } from "react";
// import SubmitButton from "./submit-button";
import { register } from "@/app/lib/actions";

export default function SignupForm() {
  const [state, loginAction, isPending] = useActionState(register, undefined);
  return (
    <form action={loginAction}>
      <div>
        <input type="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <div>
        <input type="text" name="firstName" placeholder="First Nam" />
      </div>
      <div>
        <input type="text" name="LastName" placeholder="Last Name" />
      </div>

      <div>
        <input type="password" name="password" placeholder="Password" />
      </div>
      <div>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" />
      </div>
      {/* {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)} */}
      <button disabled={isPending} type="submit">
        Login
      </button>
    </form>
  );
}
