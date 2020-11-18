import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class WishListUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlineShopApp.wishList.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#wish-list-title'));

  restrictedInput: ElementFinder = element(by.css('input#wish-list-restricted'));
  customerSelect = element(by.css('select#wish-list-customer'));
}
