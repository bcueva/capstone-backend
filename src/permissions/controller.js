import { BaseController } from '../base/controller.js'
import { PermissionsModel } from './model.js'
import { validatePartialPermission, validatePermission } from './schema.js'

const permissionsModel = new PermissionsModel()

export class PermissionsController extends BaseController {
  constructor () {
    super({
      name: 'Permission',
      model: permissionsModel,
      validations: {
        create: validatePermission,
        update: validatePartialPermission
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
