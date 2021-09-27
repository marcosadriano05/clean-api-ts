import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Error Mongo Repository', () => {
  let logErrorsCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    logErrorsCollection = await MongoHelper.getCollection('errors')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await logErrorsCollection.deleteMany({})
  })

  test('Should insert an error stack with success', async () => {
    const sut = makeSut()
    await sut.logError('any_stack')
    const log = await logErrorsCollection.findOne()
    expect(log).toHaveProperty('stack')
    expect(log).toHaveProperty('date')
    expect(log.stack).toBe('any_stack')
  })
})
