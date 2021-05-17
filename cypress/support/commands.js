Cypress.Commands.add("seedAndVisit", (result = "fixture:todos") => {

    cy.server()
    cy.route("GET", "/api/todos", result);
    cy.visit("/");

})