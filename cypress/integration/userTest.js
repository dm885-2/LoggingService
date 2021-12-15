// This test will try to access the log as a regular user
// and will check if the log is accessible.
// It should be rejectede as the user does not have the right to access the log - 403.
const time = Date.now();
const user = {
    username: `u${time}`,
    password: `p${time}`,
};


let refreshToken;
let accessToken;




describe('USER Test', () => {

    it("Create user login", () => 
    cy.request('POST', `/auth/register`, {
        "username": user.username,
        "password": user.password,
        "passwordRepeat": user.password
        
    }).then((response1) => {
        expect(response1.body).to.have.property('error', false)
    cy.request('POST', `/auth/login`, user).then((response2) => {
        expect(response2.body).to.have.property('error', false);
        refreshToken = response2.body.refreshToken;
       
    cy.request('POST', `/auth/accessToken`, {
        refreshToken
    }).then((response3) => {
        expect(response3.body).to.have.property('error', false)
        accessToken = response3.body.accessToken;
    })
    });
    }));

    it("User will not logs", () => {
        
        cy.request({
            method: "get",
             url: "/logs",
             failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${accessToken}`
          }}).then(res => {
            expect(res).to.have.property("status", 403);

            return;
        });
    })


    
});
