//https://stackoverflow.com/a/66489655/9377904
function random_text(): string {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

describe("works", () => {
    it("logs in and out", () => {
        cy.visit("/signIn");
        cy.contains("signIn").should("be.visible");

        cy.get("input[placeholder='email']").type("test@email.com");
        cy.get("input[placeholder='password']").type("password");

        cy.contains("Submit").click();

        cy.contains("main").should("be.visible");
        cy.contains("SIGN OUT").click();
    });

    it("adds farm", () => {
        cy.visit("/signIn");
        cy.contains("signIn").should("be.visible");

        cy.get("input[placeholder='email']").type("test@email.com");
        cy.get("input[placeholder='password']").type("password");
        cy.contains("Submit").click();

        cy.contains("ADD FARM").click();

        const name = random_text();
        cy.get("input[placeholder='name']").type(name);
        cy.get("input[placeholder='display name']").type(`display_${name}`);

        cy.contains("Submit").click();
        cy.contains("main").should("be.visible");
    });

    it("can't add duplicate farm name", () => {
        const name = random_text();

        const add_farm = (name: string) => {
            cy.contains("ADD FARM").click();
            cy.get("input[placeholder='name']").type(name);
            cy.get("input[placeholder='display name']").type(`display_${name}`);
            cy.contains("Submit").click();
        };

        add_farm(name);
        cy.contains("main").should("be.visible");
        add_farm(name);
        cy.contains("main").should("not.be.visible");

        cy.contains("Cancel").click();
        cy.contains("SIGN OUT").click();
    });
});
