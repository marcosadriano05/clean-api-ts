import { AccountModel } from '../add-account/db-add-account-protocols'

export interface LoadUserByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
