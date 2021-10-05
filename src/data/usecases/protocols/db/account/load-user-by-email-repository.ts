import { AccountModel } from '../../../add-account/db-add-account-protocols'

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
