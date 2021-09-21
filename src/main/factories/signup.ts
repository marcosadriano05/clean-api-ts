import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-error-repository/log-error'
import { Validation } from '../../presentation/protocols/validation'

class ValidationTest implements Validation {
  validate (input: any): Error {
    return null
  }
}

export const makeSignupController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationTest = new ValidationTest()
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount, validationTest)
  const logErrorMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorMongoRepository)
}
