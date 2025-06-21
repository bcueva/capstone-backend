import { BaseController } from '../base/controller.js'
import { CompaniesModel } from './model.js'
import { validatePartialCompany, validateCompany } from './schema.js'

const companiesModel = new CompaniesModel()

export class CompaniesController extends BaseController {
  constructor () {
    super({
      name: 'Company',
      model: companiesModel,
      validations: {
        create: validateCompany,
        update: validatePartialCompany
      }
    })
  }
}
