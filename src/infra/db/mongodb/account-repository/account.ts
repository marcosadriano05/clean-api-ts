import { LoadUserByEmailRepository } from '../../../../data/usecases/authentication/db-authentication-protocols'
import { AddAccountRepository } from '../../../../data/usecases/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadUserByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const insertedAccountId = result.insertedId.toString()
    const account = {
      id: insertedAccountId,
      name: accountData.name,
      email: accountData.email,
      password: accountData.password
    }
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    if (!result) {
      return null
    }
    return MongoHelper.mapToId(result)
  }
}
