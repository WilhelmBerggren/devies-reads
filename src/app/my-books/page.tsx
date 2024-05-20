import { getClient } from "@/client";
import { Book } from "@/components/Book";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function BookFromId({
  bookId,
  status,
  isLoggedIn,
}: {
  bookId: string;
  status: string;
  isLoggedIn: boolean;
}) {
  const response = await getClient().GET("/books/{id}", {
    params: { path: { id: bookId } },
  });

  return response.data ? (
    <Book
      {...response.data}
      status={status}
      id={bookId}
      isLoggedIn={isLoggedIn}
    />
  ) : (
    <p>Book not found</p>
  );
}

async function Content() {
  const userId = cookies().get("userId")?.value;

  if (!userId) {
    redirect("/");
  }
  const response = await getClient().GET("/users/{id}", {
    params: { path: { id: userId } },
  });

  const isLoggedInResponse = await getClient().GET("/is-logged-in", {
    parseAs: "text",
  });

  const isLoggedIn = isLoggedInResponse.data === "Yes";

  return (
    <ul className="flex flex-col w-full gap-4">
      {response.data?.shelf?.map((book) => (
        <li key={book.bookId}>
          <Suspense fallback={<p>Loading...</p>}>
            <BookFromId
              status={book.status}
              bookId={book.bookId}
              isLoggedIn={isLoggedIn}
            />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl">My books</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Content />
      </Suspense>
    </main>
  );
}
