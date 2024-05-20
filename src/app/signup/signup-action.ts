"use server";

import { getClient } from "@/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(prevState: any, formData: FormData) {
  "use server";
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const action = formData.get("action")?.toString();

  if (action === "signUp" && username && password) {
    const response = await getClient()
      .POST("/auth/register", {
        signal: AbortSignal.timeout(5000),
        body: { username, password },
      })
      .catch(() => ({ data: null }));

    if (response.data?.accessToken) {
      cookies().set("Authorization", `bearer ${response.data?.accessToken}`);
      cookies().set("userId", response.data?.userId);
      redirect("/");
    } else {
      return {
        errorMessage: "Failed to sign up. Please try again.",
      };
    }
  } else {
    const response = await getClient().POST("/auth/login", {
      body: { username, password },
    });
    if (response.data?.accessToken) {
      cookies().set("Authorization", `bearer ${response.data?.accessToken}`);
      cookies().set("userId", response.data?.userId);
      redirect("/");
    } else {
      return {
        errorMessage: "Failed to sign in. Please try again.",
      };
    }
  }
}
