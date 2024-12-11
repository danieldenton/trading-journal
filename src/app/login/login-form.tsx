"use client";

import { useActionState } from "react";
import SubmitButton from "./submit-button";
import { login } from "@/actions";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <form action={loginAction}>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <SubmitButton />
    </form>
  );
}