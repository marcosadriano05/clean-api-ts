import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbAddSurvey } from '../../usecases/survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addSurveyController, logMongoRepository)
}
