import { selectors } from "../support/selectors";

describe('Modal works correctly', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should open and close by close-button', () => {
        cy.get(selectors.ingredients.ingredient + ':eq(0)').click();
        cy.get(selectors.modal.container).should('exist');
        cy.get(selectors.modal.container + ' p').contains('Детали ингредиента');

        cy.get(selectors.modal.closeButton).click();
        cy.get(selectors.modal.container).should('not.exist');
    });

    it('should open and close by overlay-click', () => {
        cy.get(selectors.ingredients.ingredient + ':eq(0)').click();
        cy.get(selectors.modal.container).should('exist');
        cy.get(selectors.modal.container + ' p').contains('Детали ингредиента');

        cy.get(selectors.modal.overlay).click({ force: true });
        cy.get(selectors.modal.container).should('not.exist');
    });
}); 