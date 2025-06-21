import { BaseController } from '../base/controller.js'
import { UsersModel } from './model.js'
import { validatePartialUser, validateUser } from './schema.js'

const usersModel = new UsersModel()

export class UsersController extends BaseController {
  constructor () {
    super({
      name: 'User',
      model: usersModel,
      validations: {
        create: validateUser,
        update: validatePartialUser
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
