import { BASE_URL } from "../support/const";
import { selectors } from "../support/selectors";

describe('Send order', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.visit('/login');

    cy.intercept("POST", `${BASE_URL}login`, { fixture: "user" });

    const userLoginData = {
      email: "solnyshko20.05@mail.ru",
      password: '6811856',
    }

    cy.get(selectors.login.email).type(`${userLoginData.email}`);
    cy.get(selectors.login.password).type(`${userLoginData.password}{enter}`);
  });

  it('should create order', () => {
    cy.wait(1000);
    cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');

    cy.get(selectors.constructor.container).should('exist');
    cy.get(selectors.constructor.container).trigger('drop');

    cy.get(selectors.constructor.bunTop).should('exist');
    cy.get(selectors.constructor.bunBottom).should('exist');

    cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
    cy.get(selectors.constructor.container).trigger('drop');
    cy.get(selectors.constructor.items).should('not.be.empty');

    cy.get(selectors.constructor.submitOrderButton).should('not.have.attr', 'disabled');
    cy.intercept("POST", `${BASE_URL}orders`, { fixture: "created-order" });
    cy.get(selectors.constructor.submitOrderButton).click();

    cy.get(selectors.modal.container).should('exist');
    cy.get(selectors.modal.orderNumber,).should('not.be.empty');
    cy.get(selectors.modal.closeButton,).click();

    cy.get(selectors.modal.container).should('not.exist');
    cy.get(selectors.constructor.bunTop).should('not.exist');
    cy.get(selectors.constructor.bunBottom).should('not.exist');
  });
}); 