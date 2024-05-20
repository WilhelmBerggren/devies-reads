import { getClient } from "@/client";
import { Book } from "@/components/Book";
import { sortBooks } from "@/utils/sort-books";
import Link from "next/link";
import { Suspense } from "react";

async function SearchContents({
  searchTerm,
  isLoggedIn,
  genre,
}: {
  searchTerm: string;
  isLoggedIn: boolean;
  genre?: string;
}) {
  const { success, books } = await getClient()
    .GET("/books", { signal: AbortSignal.timeout(5000) })
    .then(async (response) => {
      if (!response.data) {
        return { success: false, books: [] };
      }

      return { success: true, books: response.data };
    })
    .catch(() => ({ success: false, books: [] }));

  const sortedBooks = sortBooks(books, searchTerm, genre);

  const genres = [...new Set(books.map((book) => book.genre))];

  return (
    <div>
      <div className="flex flex-row gap-2 underline">
        {genres.map((genre) => (
          <Link key={genre} href={`/search/${searchTerm}?genre=${genre}`}>
            {genre}
          </Link>
        ))}
      </div>
      {sortedBooks && sortedBooks.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {sortedBooks?.map(({ book }) => (
            <li key={book.id}>
              <Book {...book} isLoggedIn={isLoggedIn} />
            </li>
          ))}
        </ul>
      ) : (
        <p>{success ? "No results found" : "Something went wrong"}</p>
      )}
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { searchTerm: string };
  searchParams: { genre?: string };
}) {
  const isLoggedInResponse = await getClient().GET("/is-logged-in", {
    parseAs: "text",
  });

  const genre = searchParams?.genre ?? undefined;

  const isLoggedIn = isLoggedInResponse.data === "Yes";

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Search results for: {params.searchTerm}</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchContents
          genre={genre}
          isLoggedIn={isLoggedIn}
          searchTerm={params?.searchTerm}
        />
      </Suspense>
    </main>
  );
}
