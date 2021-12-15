
const time = Date.now();

// This test will just try to acces the API without any user
// and will check if the API returns a 401 error

describe('No User Test', () => {
    it("Should not get any logs", () => {
        
        cy.request({
            method: "get",
            url: "/logs",
            failOnStatusCode: false,
           
          }).then(res => {
            expect(res).to.have.property("status", 401);

            return;
        });
    })
});
