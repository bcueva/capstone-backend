import { BaseController } from '../base/controller.js'
import { ContactsModel } from './model.js'
import { validatePartialContact, validateContact } from './schema.js'

const contactsModel = new ContactsModel()

export class ContactsController extends BaseController {
  constructor () {
    super({
      name: 'Contact',
      model: contactsModel,
      validations: {
        create: validateContact,
        update: validatePartialContact
      }
    })
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.model.getAll(req.query)
      return res.status(200).json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
