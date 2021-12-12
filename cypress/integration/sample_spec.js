const ip = "http://127.0.0.1:3000"; // Should be url to UI
describe('Loggin Test', () => {
    describe('Rapid River Tests', () => {
        it("Test GET /", () => {  
            cy.request('GET', ip + "/").then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
            })
        })
    });
    // create a cypress test, where a signup request is made to the server. The logging services should be tested and add to database
    describe('Signup Tests', () => {
        it("Test POST /signup", () => {
            cy.request({
                method: 'POST',
                url: ip + "/signup",
                body: {
                    username: "test",
                    password: "test",
                    repeatPassword: "test"
                }
            }).then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
                // Get all logs from database and check if the log from the signup request is in the database
                cy.request({
                    method: 'GET',
                    url: ip + "/logs"
                }).then((response) => {
                    cy.wrap(response).its('status').should('eq', 200);
                    cy.wrap(response.body).its('length').should('eq', 1);
                    //cy.wrap(response.body[0]).its('username').should('eq', "test");
                    //cy.wrap(response.body[0]).its('password').should('eq', "test");
                    //cy.wrap(response.body[0]).its('type').should('eq', "signup");
                }

                )

            })
        })
    });
    
});