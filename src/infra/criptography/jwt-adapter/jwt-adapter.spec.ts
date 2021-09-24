import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  test('Should call Jwt sign with corretc params', async () => {
    const sut = new JwtAdapter('secret')
    const sighSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(sighSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
