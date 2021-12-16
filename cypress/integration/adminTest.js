
describe('ADMIN Test', () => {
    //Same test as in Authentication Services, as we just need to create a user and loging

    before(()=> {
        const uname = "u"+Date.now();
        const pass = "p"+Date.now();
        cy.registerAdmin(uname, pass);
        cy.login(uname, pass);
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
