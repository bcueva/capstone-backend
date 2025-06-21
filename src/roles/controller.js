import { BaseController } from '../base/controller.js'
import { RolesModel } from './model.js'
import { validatePartialRole, validateRole } from './schema.js'

const rolesModel = new RolesModel()

export class RolesController extends BaseController {
  constructor () {
    super({
      name: 'Role',
      model: rolesModel,
      validations: {
        create: validateRole,
        update: validatePartialRole
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
