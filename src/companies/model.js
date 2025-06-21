import { BaseModel } from '../base/model.js'

export class CompaniesModel extends BaseModel {
  constructor () {
    super({ tableName: 'company' })
  }
}
