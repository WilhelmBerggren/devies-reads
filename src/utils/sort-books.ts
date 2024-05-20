export function sortBooks<Book extends { name: string; description: string }>(
  books: Book[],
  searchTerm: string
) {
  const withSearchScores = books.map((book) => ({
    nameMatches: book.name.toLowerCase().includes(searchTerm.toLowerCase()),
    descriptionMatches: book.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
    book,
  }));

  const filtered = withSearchScores
    ?.filter((scores) => scores.nameMatches || scores.descriptionMatches)
    .sort((a, b) => {
      const scoreA = Number(b.nameMatches) + Number(b.descriptionMatches);
      const scoreB = Number(a.nameMatches) + Number(a.descriptionMatches);
      return scoreA - scoreB;
    });

  return filtered;
}
