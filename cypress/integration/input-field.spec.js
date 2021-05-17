describe('Input form', () => {

    beforeEach(() => {
        cy.seedAndVisit([]);

    })
    it("checks focus on the page load", () => {

        cy.focused()
          .should("have.class", "new-todo")
    })

    it("contains the typed text", () => {
        const typedText = "buy butter"

        cy.get(".new-todo")
          .type(typedText)
          .should("have.value", typedText)
    })

    context("form submission", () => {

        beforeEach(() => {
            cy.server();
        })
        it("adds new todo on submit", () => {
            const typedText = "buy milk"

            cy.route("POST", "/api/todos", {
                name: typedText,
                id: 1,
                isComplete: false
            })

            cy.get(".new-todo")
            .type(typedText)
            .type("{enter}")
            .should("have.value", "")

            cy.get(".todo-list li")
            .should("have.length", 1)
            .and("contain", typedText)
        })

        it("shows error on failure", () => {
            cy.route({
                url: "/api/todos",
                status: 500,
                method: "POST",
                response: {}
            })

            cy.get(".new-todo")
            .type("book tickets{enter}")

            cy.get(".todo-list li")
            .should("not.exist")

            cy.get(".error")
            .should("be.visible")
        })
    })
})
