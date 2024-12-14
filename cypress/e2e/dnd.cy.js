import { selectors } from "../support/selectors";

describe('DND works correctly', () => {
  before(() => {
    cy.visit('/');
  });

  it('should drag to constructor', () => {
    cy.wait(1000);
    cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');

    cy.get(selectors.constructor.container).should('exist');
    cy.get(selectors.constructor.container).trigger('drop');

    cy.get(selectors.constructor.bunTop).should('exist');
    cy.get(selectors.constructor.bunBottom).should('exist');

    cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
    cy.get(selectors.constructor.container).trigger('drop');
    cy.get(selectors.constructor.items).should('not.be.empty');
  });
}); 