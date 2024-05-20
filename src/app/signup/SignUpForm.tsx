"use client";

import { signUp } from "./signup-action";
import { useFormState } from "react-dom";

export function SignUpForm() {
  const [state, formAction] = useFormState(signUp, { errorMessage: "" });

  return (
    <form action={formAction} className="flex flex-col gap-2 text-black">
      <input type="text" name="username" required />
      <input type="password" name="password" required />
      <select name="action">
        <option value="signUp">Sign Up</option>
        <option value="login">Login</option>
      </select>
      <button type="submit" className="bg-green-600" data-cy="signup-button">
        Sign Up / Sign In
      </button>
      {state.errorMessage && (
        <p className="text-red-500">{state.errorMessage}</p>
      )}
    </form>
  );
}
