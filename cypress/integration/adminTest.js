
const time = Date.now();
const admin = {
    username: `u${time}`,
    password: `p${time}`,
};


let refreshToken;
let accessToken;




describe('ADMIN Test', () => {
    //Same test as in Authentication Services, as we just need to create a user and loging

    it("Create Admin login", () => 
    cy.request('POST', `/auth/register`, {
        "username": admin.username,
        "password": admin.password,
        "passwordRepeat": admin.password,
        "rank": 1
    }).then((response1) => {
        expect(response1.body).to.have.property('error', false)
    cy.request('POST', `/auth/login`, admin).then((response2) => {
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

    it("Admin will get logs", () => {
        
        cy.request({
            method: "get",
             url: "/logs",
            headers: {
                "Authorization": `Bearer ${accessToken}`
          }}).then(res => {
            expect(res).to.have.property("status", 200);

            return;
        });
    })


    
});
