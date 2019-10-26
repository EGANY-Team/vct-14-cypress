/* eslint-disable no-undef */
const fakeAuth = {
  user: {
    displayName: "THANH"
  },
  token: "fake-token"
};

describe("LoginPage", () => {
  beforeEach(() => {
    // clear any old token
    localStorage.removeItem("vct-14");
    // go to login route
    cy.visit("http://localhost:3000/login");
  });

  it("validates username", () => {
    cy.get("#username").type(" ");
    cy.get("button").click();

    cy.get("p.red").should("have.text", "Username must be non-empty string");
  });

  it("validates password", () => {
    cy.get("#username").type("any-username");
    cy.get("button").click();

    cy.get("p.red").should("have.text", "Password must be non-empty string");
  });

  it("handles invalid username & password", () => {
    cy.get("#username").type("thanh");
    cy.get("#password").type("incorrectpassword");
    cy.get("button").click();

    cy.get("p.red").should("have.text", "Incorrect username or password");
  });

  it("handles valid username & password", () => {
    cy.get("#username").type(fakeAuth.user.displayName.toLowerCase());
    cy.get("#password").type("bananhthanh");
    cy.get("button").click();

    cy.location("pathname").should(pathname => {
      const json = localStorage.getItem("vct-14");

      expect(pathname).to.equal("/");
      expect(json).to.not.be.null;

      const auth = JSON.parse(json);
      expect(auth).to.have.all.keys("user", "token");
      expect(auth.user).to.deep.equal(fakeAuth.user);
    });
  });

  it("redirects back to home page if token exist", () => {
    localStorage.setItem("vct-14", JSON.stringify(fakeAuth));

    cy.location("pathname").should("match", /\//);
  });
});
