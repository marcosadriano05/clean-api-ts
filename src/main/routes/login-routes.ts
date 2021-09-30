import { Router } from 'express'
import { adapter } from '../adapters/express/express-route-adapter'
import { makeSignupController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapter(makeSignupController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adapter(makeLoginController()))
}
