import { sortBooks } from "../utils/sort-books";
import { describe, it, expect } from "vitest";

const books = [
  {
    name: "Clean Architecture",
    description: "A book about architecture",
    genre: "Non-fiction",
  },
  {
    name: "Clean Code",
    description: "A book about clean code",
    genre: "Fantasy",
  },
  {
    name: "Refactoring",
    description: "A book about refactoring",
    genre: "Non-fiction",
  },
];

describe("Sort books", () => {
  it("Should filter books by search term", () => {
    const sorted = sortBooks(books, "refactoring");

    expect(sorted[0].book.name).toBe("Refactoring");
  });
  it("Should filter books by search term and genre", () => {
    const sorted = sortBooks(books, "clean", "Fantasy");

    expect(sorted[0].book.name).toBe("Clean Code");
    expect(sorted.length).toBe(1);
  });

  it("Should rate books higher if term exists in both name and description", () => {
    const sorted = sortBooks(books, "clean");

    expect(sorted[0].book.name).toBe("Clean Code");
  });
});
