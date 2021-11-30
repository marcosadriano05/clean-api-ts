import { Router } from 'express'
import { adapter } from '../adapters/express/express-route-adapter'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapter(makeSignupController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adapter(makeLoginController()))
}
