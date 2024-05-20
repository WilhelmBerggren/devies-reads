import { getClient } from "@/client";
import { Book } from "@/components/Book";
import { sortBooks } from "@/utils/sort-books";
import { Suspense } from "react";

async function SearchContents({
  searchTerm,
  isLoggedIn,
}: {
  searchTerm: string;
  isLoggedIn: boolean;
}) {
  const { success, books } = await getClient()
    .GET("/books", { signal: AbortSignal.timeout(5000) })
    .then(async (response) => {
      if (!response.data) {
        return { success: false, books: [] };
      }

      const sorted = sortBooks(response.data, searchTerm);

      return { success: true, books: sorted };
    })
    .catch(() => ({ success: false, books: [] }));

  return (
    <>
      {books && books.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {books?.map(({ book }) => (
            <li key={book.id}>
              <Book {...book} isLoggedIn={isLoggedIn} />
            </li>
          ))}
        </ul>
      ) : (
        <p>{success ? "No results found" : "Something went wrong"}</p>
      )}
    </>
  );
}

export default async function Page({
  params,
}: {
  params: { searchTerm: string };
}) {
  const isLoggedInResponse = await getClient().GET("/is-logged-in", {
    parseAs: "text",
  });

  const isLoggedIn = isLoggedInResponse.data === "Yes";

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Search results for: {params.searchTerm}</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchContents
          isLoggedIn={isLoggedIn}
          searchTerm={params?.searchTerm}
        />
      </Suspense>
    </main>
  );
}
