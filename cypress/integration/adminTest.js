
describe('ADMIN Test', () => {


    before(()=> {
       cy.loginAsAdmin();
        cy.getAT();
       
    });

    it("Admin will get logs", () => {
        
        cy.request({
            method: "get",
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
