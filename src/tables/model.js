import { BaseModel } from '../base/model.js'

export class TablesModel extends BaseModel {
  constructor () {
    super({ tableName: 'tables' })
  }
}
