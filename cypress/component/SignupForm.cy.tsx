import { MockedProvider } from "@apollo/client/testing";
import { mount } from "cypress/react";
import SignupForm from "../../client/src/components/SignupForm";
import { LOGIN_USER } from "../../client/src/utils/mutations";

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        username: "test@test.com",
        password: "test",
      },
    },
    result: {
      data: {
        login: {
          __typename: "LoginResponse",
          token: "mocked-token",
          user: {
            __typename: "User",
            id: "1",
            email: "test@test.com",
          },
        },
      },
    },
  },
];

describe("<SignupForm />", () => {
  it("should submit the form and get a successful response", () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupForm handleModalClose={() => console.log("Modal closed")} />
      </MockedProvider>
    );

    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='password']").type("test");
    cy.get("button[type='submit']").should('be.visible');
  });
});
