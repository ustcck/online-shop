import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlineShopApp.product.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#product-title'));

  keywordsInput: ElementFinder = element(by.css('input#product-keywords'));

  descriptionInput: ElementFinder = element(by.css('input#product-description'));

  ratingInput: ElementFinder = element(by.css('input#product-rating'));

  dateAddedInput: ElementFinder = element(by.css('input#product-dateAdded'));

  dateModifiedInput: ElementFinder = element(by.css('input#product-dateModified'));

  wishListSelect = element(by.css('select#product-wishList'));
}
