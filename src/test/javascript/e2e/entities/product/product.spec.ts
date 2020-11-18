/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductComponentsPage, { ProductDeleteDialog } from './product.page-object';
import ProductUpdatePage from './product-update.page-object';
import ProductDetailsPage from './product-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

const expect = chai.expect;

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProductUpdatePage;
  let detailsPage: ProductDetailsPage;
  let listPage: ProductComponentsPage;
  let deleteDialog: ProductDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Products', async () => {
    await navBarPage.getEntityPage('product');
    listPage = new ProductComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Product page', async () => {
      await listPage.createButton.click();
      updatePage = new ProductUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/onlineShopApp.product.home.createOrEditLabel/);
    });

    it('should create and save Products', async () => {
      await updatePage.titleInput.sendKeys('title');
      expect(await updatePage.titleInput.getAttribute('value')).to.match(/title/);

      await updatePage.keywordsInput.sendKeys('keywords');
      expect(await updatePage.keywordsInput.getAttribute('value')).to.match(/keywords/);

      await updatePage.descriptionInput.sendKeys('description');
      expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/description/);

      await updatePage.ratingInput.sendKeys('5');
      expect(await updatePage.ratingInput.getAttribute('value')).to.eq('5');

      await updatePage.dateAddedInput.sendKeys('2001-01-01');
      expect(await updatePage.dateAddedInput.getAttribute('value')).to.eq('2001-01-01');

      await updatePage.dateModifiedInput.sendKeys('2001-01-01');
      expect(await updatePage.dateModifiedInput.getAttribute('value')).to.eq('2001-01-01');

      // await  selectLastOption(updatePage.wishListSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilDisplayed(listPage.successAlert);
      expect(await listPage.successAlert.isDisplayed()).to.be.true;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new ProductDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/onlineShopApp.product.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Product page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new ProductDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Product page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.titleInput.clear();
        await updatePage.titleInput.sendKeys('modified');
        expect(await updatePage.titleInput.getAttribute('value')).to.match(/modified/);

        await updatePage.keywordsInput.clear();
        await updatePage.keywordsInput.sendKeys('modified');
        expect(await updatePage.keywordsInput.getAttribute('value')).to.match(/modified/);

        await updatePage.descriptionInput.clear();
        await updatePage.descriptionInput.sendKeys('modified');
        expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/modified/);

        await clear(updatePage.ratingInput);
        await updatePage.ratingInput.sendKeys('6');
        expect(await updatePage.ratingInput.getAttribute('value')).to.eq('6');

        await updatePage.dateAddedInput.clear();
        await updatePage.dateAddedInput.sendKeys('2019-01-01');
        expect(await updatePage.dateAddedInput.getAttribute('value')).to.eq('2019-01-01');

        await updatePage.dateModifiedInput.clear();
        await updatePage.dateModifiedInput.sendKeys('2019-01-01');
        expect(await updatePage.dateModifiedInput.getAttribute('value')).to.eq('2019-01-01');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        expect(await listPage.infoAlert.isDisplayed()).to.be.true;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
