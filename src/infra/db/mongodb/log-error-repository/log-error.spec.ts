import { MongoHelper } from '../helpers/mongo-helper'
import { LogErrorMongoRepository } from './log-error'

const makeSut = (): LogErrorMongoRepository => {
  return new LogErrorMongoRepository()
}

describe('Log Error Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const logErrorsCollection = await MongoHelper.getCollection('errors')
    await logErrorsCollection.deleteMany({})
  })

  test('Should insert an error stack with success', async () => {
    const sut = makeSut()
    await sut.log('any_stack')
    const logErrorsCollection = await MongoHelper.getCollection('errors')
    const log = await logErrorsCollection.findOne()
    expect(log).toHaveProperty('stack')
    expect(log).toHaveProperty('date')
    expect(log.stack).toBe('any_stack')
  })
})
