import { Router } from 'express'
import { makeSignupController } from '../factories/signup/signup-factory'
import { adapter } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapter(makeSignupController()))
}
