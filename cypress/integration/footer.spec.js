describe("Footer", () => {
    context("with single todo", () => {
        it("displays singular todo in count", () => {
            cy.seedAndVisit([{name: "Buy Milk", isComplete: false, id: 1}])

            cy.get(".todo-count")
            .should("contain", "1 todo left")
        })
    })

    context("with multiple todos", () => {

        beforeEach(() => {
            cy.seedAndVisit()
        })
        it("displays plural todos in count", () => {
            cy.get(".todo-count")
            .should("contain", "3 todos left")
        })

        it.only("filter todos", () => {
            const actions = [
                {linkText: "Active", expectedLength: 3},
                {linkText: "Completed", expectedLength: 1},
                {linkText: "All", expectedLength: 4},
            ]

            cy.wrap(actions)
            .each(arr => {

                cy.contains(arr.linkText)
                .click();
    
                cy.get(".todo-list li")
                .should("have.length", arr.expectedLength)
            })
        })
    })
})