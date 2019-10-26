/* eslint-disable no-undef */
const fakeAuth = {
  user: {
    displayName: "Thanh"
  },
  token: "fake-token"
};

describe("HomePage", () => {
  beforeEach(() => {
    localStorage.setItem("vct-14", JSON.stringify(fakeAuth));
    cy.visit("http://localhost:3000/");
  });

  it("renders nav", () => {
    cy.get("nav").should("be.visible");
    cy.get("nav")
      .find("img[alt='EGANY logo']")
      .should("be.visible")
      .and("have.attr", "title")
      .and("include", "Home");
    cy.get("nav")
      .find("button")
      .should("be.visible")
      .and("have.text", "Logout");
  });

  it("renders correct user's info", () => {
    cy.get("h3").should("have.text", `Hello, ${fakeAuth.user.displayName}`);
  });

  it("redirects back to login if there's no token", () => {
    localStorage.removeItem("vct-14");

    cy.location("pathname").should("equal", "/");
  });

  it("logs user out when click [Logout] button", () => {
    cy.get("nav > button").click();

    cy.location("pathname").should($url => {
      expect($url).to.equal("/login");
      expect(localStorage.getItem("vct-14")).to.be.null;
    });
  });
});
