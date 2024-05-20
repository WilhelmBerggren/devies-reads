"use server";

import { getClient } from "@/client";
import { cookies } from "next/headers";

export async function bookAction(lastState: any, formData: FormData) {
  "use server";

  const rating = Number(formData.get("rating")?.toString());
  const bookId = formData.get("bookId")?.toString();
  const status = formData.get("status")?.toString();

  const userShelf = new Map();
  const userId = cookies().get("userId")?.value;

  if (!userId) {
    return { message: "Not logged in" };
  }

  if (userId) {
    const userResponse = await getClient().GET("/users/{id}", {
      params: { path: { id: userId } },
    });
    for (const book of userResponse.data?.shelf || []) {
      userShelf.set(book.bookId, book.status);
    }
  }

  if (bookId && rating) {
    const response = await getClient().POST("/books/{id}/rate", {
      params: {},
      body: { rating: rating, bookId },
    });
    console.log(JSON.stringify(response));

    if (response.data) {
      return { message: "Rated." };
    } else {
      return { message: "Could not rate. Please try again." };
    }
  }

  if (
    bookId &&
    userId &&
    (status === "haveRead" ||
      status === "currentlyReading" ||
      status === "wantToRead")
  ) {
    if (userShelf.has(bookId)) {
      const response = await getClient().PUT("/users/{id}/shelf", {
        params: { path: { id: userId } },
        body: { bookId, status },
      });

      if (response.data) {
        return { message: "Updated." };
      } else {
        return { message: "Could not update. Please try again." };
      }
    } else {
      const response = await getClient().POST("/users/{id}/shelf", {
        params: { path: { id: userId } },
        body: { bookId, status },
      });

      if (response.data) {
        return { message: "Updated." };
      } else {
        return { message: "Could not update. Please try again." };
      }
    }
  } else {
    return { message: "Could not update. Please try again." };
  }
}
