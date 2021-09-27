import { Encrypter } from '../../../data/usecases/authentication/db-authentication-protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const payload = { id: value }
    const accessToken = jwt.sign(payload, this.secret)
    return accessToken
  }
}
