import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return 'hash'
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash method with correct params', async () => {
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

  test('Should call compare method with correct params', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hash_value')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash_value')
  })

  test('Should compare method returns true if compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(true)
  })
})
