import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadUserByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  constructor (loadUserByEmailRepository: LoadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email } = authentication
    await this.loadUserByEmailRepository.load(email)
    return await new Promise(resolve => resolve(null))
  }
}
