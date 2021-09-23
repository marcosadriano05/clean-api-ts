import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../protocols/criptography/token-generator'
import { LoadUserByEmailRepository } from '../protocols/db/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  constructor (
    loadUserByEmailRepository: LoadUserByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
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
    await this.updateAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
