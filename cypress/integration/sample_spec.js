describe('Loggin Test', () => {
    it('should log', () => {
        cy.request("POST", "/signup", {
            "username": "123",
            "password": "123",
            "passwordRepeat": "123"
        }).then((res) => {
            return res;
        });
    });

});