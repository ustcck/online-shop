import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CustomerUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlineShopApp.customer.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));

  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));

  emailInput: ElementFinder = element(by.css('input#customer-email'));

  telephoneInput: ElementFinder = element(by.css('input#customer-telephone'));
}
