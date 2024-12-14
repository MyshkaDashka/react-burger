export const selectors = {
  login: {
    email: '[data-testid=email_input]',
    password: '[data-testid=password_input]'
  },

  modal: {
    container: '[data-test=modalContainer]',
    orderNumber: '[data-test=orderNumber]',
    closeButton: '[data-test=modalCloseButton]',
    overlay: '[data-test=modalOverlay]'
  },

  ingredients: {
    ingredient: '[data-test=ingredientItem]'
  },

  constructor: {
    container: '[data-test=constructorContainer]',
    bunTop: '[data-test=constructorBunTop]',
    bunBottom: '[data-test=constructorBunBottom]',
    items: '[data-test=constructorItems]',
    submitOrderButton: '[data-test=submitOrderButton]'
  }
};