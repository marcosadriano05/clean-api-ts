import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../protocols/criptography/token-generator'
import { LoadUserByEmailRepository } from '../protocols/db/load-user-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  constructor (
    loadUserByEmailRepository: LoadUserByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication
    const account = await this.loadUserByEmailRepository.load(email)
    if (!account) {
      return null
    }
    const passwordMatches = await this.hashComparer.compare(password, account.password)
    if (!passwordMatches) {
      return null
    }
    const accessToken = await this.tokenGenerator.generate(account.id)
    return accessToken
  }
}
