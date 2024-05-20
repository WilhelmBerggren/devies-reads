import { getClient } from "@/client";
import { Book } from "@/components/Book";
import { cookies } from "next/headers";

export default async function Home() {
  const response = await getClient().GET("/books");
  const books = response.data;

  const isLoggedInResponse = await getClient().GET("/is-logged-in", {
    parseAs: "text",
  });

  const isLoggedIn = isLoggedInResponse.data === "Yes";

  const userShelf = new Map();
  const userId = cookies().get("userId")?.value;
  if (isLoggedIn && userId) {
    const userResponse = await getClient().GET("/users/{id}", {
      params: { path: { id: userId } },
    });
    for (const book of userResponse.data?.shelf || []) {
      userShelf.set(book.bookId, book.status);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-xl" data-cy="books-title">
        Books
      </h1>
      <ul>
        {books?.map((book) => (
          <li
            key={book.id}
            className="flex items-center justify-between gap-4 p-4 border-b border-gray-300 dark:border-neutral-800/30"
          >
            <Book
              {...book}
              status={userShelf.get(book.id)}
              isLoggedIn={isLoggedIn}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
