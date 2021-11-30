import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'

export const makeSignupController = (): Controller => {
  const signupController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  const logErrorMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorMongoRepository)
}
