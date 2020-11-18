import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AddressUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlineShopApp.address.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  address1Input: ElementFinder = element(by.css('input#address-address1'));

  address2Input: ElementFinder = element(by.css('input#address-address2'));

  cityInput: ElementFinder = element(by.css('input#address-city'));

  postcodeInput: ElementFinder = element(by.css('input#address-postcode'));

  countryInput: ElementFinder = element(by.css('input#address-country'));

  customerSelect = element(by.css('select#address-customer'));
}
