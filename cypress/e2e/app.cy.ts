describe("Core features", () => {
  it("Should allow core features to work", () => {
    cy.visit("/");

    // We are shown the books page upon visiting the site
    cy.get('h1[data-cy="books-title"]').contains("Books");

    // Go to sign up page
    cy.get('a[href="/signup"]').click();

    // Sign up
    cy.get('input[name="username"]').type(
      "user" + Math.random().toString().slice(2, 8)
    );
    cy.get('input[name="password"]').type("password");
    cy.get('button[data-cy="signup-button"]').click();

    // Seach for a book
    cy.get('input[name="search"]').type("Clean").type("{enter}");

    // Book is present
    cy.get("h5").contains("Clean Architecture");

    // Choose "Want To Read" from select box
    cy.get('select[name="status"]').select("Want to read");
    cy.get('button[data-cy="submit-status"]').click();

    // Go to my books page
    cy.get("a[href='/my-books']").click();

    // Book is present
    cy.get("h5").contains("Clean Architecture");

    // Status is shown
    cy.get("select").contains("Want to read");

    // Rate the book
    cy.get('input[name="rating"]').type("5");
    cy.get('button[data-cy="submit-status"]').click();

    // Log out
    cy.get("button").contains("Log out").click();
  });
});
