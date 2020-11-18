/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CategoryComponentsPage, { CategoryDeleteDialog } from './category.page-object';
import CategoryUpdatePage from './category-update.page-object';
import CategoryDetailsPage from './category-details.page-object';

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

describe('Category e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: CategoryUpdatePage;
  let detailsPage: CategoryDetailsPage;
  let listPage: CategoryComponentsPage;
  let deleteDialog: CategoryDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Categories', async () => {
    await navBarPage.getEntityPage('category');
    listPage = new CategoryComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Category page', async () => {
      await listPage.createButton.click();
      updatePage = new CategoryUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/onlineShopApp.category.home.createOrEditLabel/);
    });

    it('should create and save Categories', async () => {
      await updatePage.descriptionInput.sendKeys('description');
      expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/description/);

      await updatePage.sortOrderInput.sendKeys('5');
      expect(await updatePage.sortOrderInput.getAttribute('value')).to.eq('5');

      await updatePage.dateAddedInput.sendKeys('2001-01-01');
      expect(await updatePage.dateAddedInput.getAttribute('value')).to.eq('2001-01-01');

      await updatePage.dateModifiedInput.sendKeys('2001-01-01');
      expect(await updatePage.dateModifiedInput.getAttribute('value')).to.eq('2001-01-01');

      await selectLastOption(updatePage.statusSelect);

      // await  selectLastOption(updatePage.parentSelect);
      // await  selectLastOption(updatePage.productSelect);

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
        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new CategoryDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/onlineShopApp.category.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Category page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new CategoryDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Category page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.descriptionInput.clear();
        await updatePage.descriptionInput.sendKeys('modified');
        expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/modified/);

        await clear(updatePage.sortOrderInput);
        await updatePage.sortOrderInput.sendKeys('6');
        expect(await updatePage.sortOrderInput.getAttribute('value')).to.eq('6');

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
