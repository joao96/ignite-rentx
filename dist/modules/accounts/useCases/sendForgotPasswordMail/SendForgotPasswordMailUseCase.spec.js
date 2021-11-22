"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '831528',
      email: 'wujo@bab.il',
      name: 'Steve Moss',
      password: '1234'
    });
    await sendForgotPasswordMailUseCase.execute('wujo@bab.il');
    expect(sendMail).toHaveBeenCalled();
  });
  it('Should not be able to send an email if user does not exist', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('mi@azewe.sy')).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it("should be able to create a user's token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      driver_license: '770431',
      email: 'jomla@ledsi.zm',
      name: 'Helena Massey',
      password: '1234'
    });
    await sendForgotPasswordMailUseCase.execute('jomla@ledsi.zm');
    expect(generateTokenMail).toHaveBeenCalled();
  });
});