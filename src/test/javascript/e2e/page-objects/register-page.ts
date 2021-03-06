import { ElementFinder, $ } from 'protractor';
import AlertPage from './alert-page';

export default class RegisterPage extends AlertPage {
  registerForm: ElementFinder = $('#register-form');
  username: ElementFinder = this.registerForm.$('#username');
  email: ElementFinder = this.registerForm.$('#email');
  firstPassword: ElementFinder = this.registerForm.$('#firstPassword');
  secondPassword: ElementFinder = this.registerForm.$('#secondPassword');
  saveButton: ElementFinder = this.registerForm.$('button[type=submit]');
  title: ElementFinder = $('#register-title');

  async getTitle() {
    return await this.title.getAttribute('id');
  }

  async autoSignUpUsing(username: string, email: string, password: string) {
    await this.username.sendKeys(username);
    await this.email.sendKeys(email);
    await this.firstPassword.sendKeys(password);
    await this.secondPassword.sendKeys(password);
    await this.saveButton.click();
  }
}
