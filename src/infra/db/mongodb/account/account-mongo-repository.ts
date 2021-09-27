import { ObjectId } from 'mongodb'
import { LoadUserByEmailRepository } from '../../../../data/usecases/protocols/db/account/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/usecases/protocols/db/account/update-access-token-repository'
import { AddAccountRepository } from '../../../../data/usecases/protocols/db/account/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadUserByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken: token } })
  }
}
