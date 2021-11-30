import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return new LogControllerDecorator(loginController, logMongoRepository)
}
