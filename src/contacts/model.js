import { BaseModel } from '../base/model.js'

export class ContactsModel extends BaseModel {
  constructor () {
    super({ tableName: 'contact' })
  }
}
