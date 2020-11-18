import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CategoryUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlineShopApp.category.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  descriptionInput: ElementFinder = element(by.css('input#category-description'));

  sortOrderInput: ElementFinder = element(by.css('input#category-sortOrder'));

  dateAddedInput: ElementFinder = element(by.css('input#category-dateAdded'));

  dateModifiedInput: ElementFinder = element(by.css('input#category-dateModified'));

  statusSelect = element(by.css('select#category-status'));
  parentSelect = element(by.css('select#category-parent'));

  productSelect = element(by.css('select#category-product'));
}
