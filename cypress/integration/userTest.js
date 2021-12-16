// This test will try to access the log as a regular user
// and will check if the log is accessible.
// It should be rejectede as the user does not have the right to access the log - 403.

describe('USER Test', () => {

    before(()=> {
        const uname = "u"+Date.now();
        const pass = "p"+Date.now();
        cy.register(uname, pass, 0);
        cy.login(uname, pass);
        cy.getAT();
    })
   

    it("User will not logs", () => {
        
        cy.request({
            method: "get",
             url: "/logs",
             failOnStatusCode: false,
             headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token")
            }
        }).then(res => {
            expect(res).to.have.property("status", 403);

            return;
        });
    })


    
});
