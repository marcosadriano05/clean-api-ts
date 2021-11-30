import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadUserByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const existentAccount = await this.loadUserByEmailRepository.loadByEmail(accountData.email)
    if (!existentAccount) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
      return account
    }
    return null
  }
}
