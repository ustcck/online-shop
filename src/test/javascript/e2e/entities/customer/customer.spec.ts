/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CustomerComponentsPage, { CustomerDeleteDialog } from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';
import CustomerDetailsPage from './customer-details.page-object';

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

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: CustomerUpdatePage;
  let detailsPage: CustomerDetailsPage;
  let listPage: CustomerComponentsPage;
  let deleteDialog: CustomerDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Customers', async () => {
    await navBarPage.getEntityPage('customer');
    listPage = new CustomerComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Customer page', async () => {
      await listPage.createButton.click();
      updatePage = new CustomerUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/onlineShopApp.customer.home.createOrEditLabel/);
    });

    it('should create and save Customers', async () => {
      await updatePage.firstNameInput.sendKeys('firstName');
      expect(await updatePage.firstNameInput.getAttribute('value')).to.match(/firstName/);

      await updatePage.lastNameInput.sendKeys('lastName');
      expect(await updatePage.lastNameInput.getAttribute('value')).to.match(/lastName/);

      await updatePage.emailInput.sendKeys('email');
      expect(await updatePage.emailInput.getAttribute('value')).to.match(/email/);

      await updatePage.telephoneInput.sendKeys('telephone');
      expect(await updatePage.telephoneInput.getAttribute('value')).to.match(/telephone/);

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

        deleteDialog = new CustomerDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/onlineShopApp.customer.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Customer page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new CustomerDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Customer page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.firstNameInput.clear();
        await updatePage.firstNameInput.sendKeys('modified');
        expect(await updatePage.firstNameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.lastNameInput.clear();
        await updatePage.lastNameInput.sendKeys('modified');
        expect(await updatePage.lastNameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.emailInput.clear();
        await updatePage.emailInput.sendKeys('modified');
        expect(await updatePage.emailInput.getAttribute('value')).to.match(/modified/);

        await updatePage.telephoneInput.clear();
        await updatePage.telephoneInput.sendKeys('modified');
        expect(await updatePage.telephoneInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        expect(await listPage.infoAlert.isDisplayed()).to.be.true;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
