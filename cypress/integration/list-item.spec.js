describe("List items", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it("shows completed items as marked", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("shows count of pending tasks", () => {
    cy.get(".todo-count").should("contain", 3);
  });

  it("deletes item on click", () => {
    cy.route({
      method: "DELETE",
      status: 200,
      url: "/api/todos/1",
      response: {},
    });

    cy.get(".todo-list li").as("list");

    cy.get("@list").first().find(".destroy").invoke("show").click();

    cy.get("@list").should("have.length", 3).and("not.contain", "Milk");
  });

  it.only("toggles checkbox", () => {

    cy.fixture("todos").then((todos) => {
      const target = Cypress._.head(todos);
      cy.route(
        "PUT",
        `/api/todos/${target.id}`,
        Cypress._.merge(target, { isComplete: true })
      );
    });

    cy.get(".todo-list li")
    .first()
    .as("first-item")

    cy.get("@first-item")
    .find(".toggle")
    .click()
    .should("be.checked");

    cy.get("@first-item")
    .should("have.class", "completed")

    cy.get(".todo-count").should("contain", 2);


  });
});
