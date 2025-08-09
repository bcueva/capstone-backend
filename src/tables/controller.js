import { BaseController } from '../base/controller.js'
import { TablesModel } from './model.js'
import { validatePartialTable, validateTable } from './schema.js'

const tablesModel = new TablesModel()

export class TablesController extends BaseController {
  constructor () {
    super({
      name: 'Table',
      model: tablesModel,
      validations: {
        create: validateTable,
        update: validatePartialTable
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
