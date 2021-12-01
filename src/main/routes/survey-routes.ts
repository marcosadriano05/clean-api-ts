import { Router } from 'express'
import { adapter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/surveys', adapter(makeAddSurveyController()))
}
