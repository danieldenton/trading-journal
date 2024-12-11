"use client";

import { useFormStatus } from "react-dom";

export default function LoginForm() {
    return (
       <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
       </form>
    );
    }