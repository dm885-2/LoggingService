const ip = "http://127.0.0.1:3000"; // Should be url to UI
describe('Loggin Test', () => {
    describe('Rapid River Tests', () => {
        it("Test GET /", () => {  
            cy.request('GET', ip + "/").then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
            })
        })
    });
    it('should log', () => {
        cy.request("POST", ip + "/signup", {
            "username": "123",
            "password": "123",
            "passwordRepeat": "123"
        }).then((res) => {
            return res;
        });
    });

});