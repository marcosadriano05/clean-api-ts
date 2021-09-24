import { Encrypter } from '../../../data/usecases/authentication/db-authentication-protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign(value, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
