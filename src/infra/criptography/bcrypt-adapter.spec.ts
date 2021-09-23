import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct params', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => await new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })
})
