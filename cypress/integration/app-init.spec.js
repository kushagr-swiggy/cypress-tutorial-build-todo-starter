describe("app initialization", () => {
  it("gets data on page load", () => {
    cy.seedAndVisit();

    cy.get(".todo-list li").should("have.length", 4);
  });

  it("shows error on api fail", () => {
    cy.server();
    cy.route({ method: "GET", url: "/api/todos", status: 500, response: {} });
    cy.visit("/");

    cy.get(".todo-list li").should("have.length", 0);

    cy.get(".error").should("be.visible");
  });
});
