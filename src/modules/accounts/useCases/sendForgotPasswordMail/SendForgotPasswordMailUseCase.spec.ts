import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let dateProvider: DayjsDateProvider;

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let mailProvider: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    dateProvider = new DayjsDateProvider();

    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,

      usersTokensRepositoryInMemory,

      dateProvider,

      mailProvider
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '831528',
      email: 'wujo@bab.il',
      name: 'Steve Moss',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('wujo@bab.il');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('mi@azewe.sy')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it("should be able to create a user's token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '770431',
      email: 'jomla@ledsi.zm',
      name: 'Helena Massey',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('jomla@ledsi.zm');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
