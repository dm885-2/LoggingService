
describe('ADMIN Test', () => {


    beforeEach(()=> {
       cy.loginAsAdmin();
        cy.getAT();
    });

    it("Admin will get logs", () => {
        cy.request({
            method: "GET",
             url: "/logs",
             headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token")
            }
        }).then(res => {
            expect(res).to.have.property("status", 200);
            return;
        });
    });
});
