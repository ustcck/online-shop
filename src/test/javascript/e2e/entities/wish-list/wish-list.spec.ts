/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import WishListComponentsPage, { WishListDeleteDialog } from './wish-list.page-object';
import WishListUpdatePage from './wish-list-update.page-object';
import WishListDetailsPage from './wish-list-details.page-object';

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

describe('WishList e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: WishListUpdatePage;
  let detailsPage: WishListDetailsPage;
  let listPage: WishListComponentsPage;
  let deleteDialog: WishListDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load WishLists', async () => {
    await navBarPage.getEntityPage('wish-list');
    listPage = new WishListComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create WishList page', async () => {
      await listPage.createButton.click();
      updatePage = new WishListUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/onlineShopApp.wishList.home.createOrEditLabel/);
    });

    it('should create and save WishLists', async () => {
      await updatePage.titleInput.sendKeys('title');
      expect(await updatePage.titleInput.getAttribute('value')).to.match(/title/);

      const selectedRestricted = await updatePage.restrictedInput.isSelected();
      if (selectedRestricted) {
        await updatePage.restrictedInput.click();
        expect(await updatePage.restrictedInput.isSelected()).to.be.false;
      } else {
        await updatePage.restrictedInput.click();
        expect(await updatePage.restrictedInput.isSelected()).to.be.true;
      }

      // await  selectLastOption(updatePage.customerSelect);

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

        deleteDialog = new WishListDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/onlineShopApp.wishList.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details WishList page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new WishListDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit WishList page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.titleInput.clear();
        await updatePage.titleInput.sendKeys('modified');
        expect(await updatePage.titleInput.getAttribute('value')).to.match(/modified/);

        const selectedRestricted = await updatePage.restrictedInput.isSelected();
        if (selectedRestricted) {
          await updatePage.restrictedInput.click();
          expect(await updatePage.restrictedInput.isSelected()).to.be.false;
        } else {
          await updatePage.restrictedInput.click();
          expect(await updatePage.restrictedInput.isSelected()).to.be.true;
        }

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        expect(await listPage.infoAlert.isDisplayed()).to.be.true;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
