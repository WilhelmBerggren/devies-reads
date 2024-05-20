import createClient from "openapi-fetch";
import { paths } from "./schema";
import { cookies } from "next/headers";

export const getClient = () =>
  createClient<paths>({
    baseUrl: "https://devies-reads-be.onrender.com/",
    headers: {
      Authorization: cookies().get("Authorization")?.value ?? "",
    },
  });
