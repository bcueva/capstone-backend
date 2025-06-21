import { LoginModel } from './model.js'
import { validateLogin } from './schema.js'

const loginModel = new LoginModel()

export class LoginController {
  login = async (req, res, next) => {
    try {
      const result = validateLogin(req.body)
      if (!result.success) {
        return res.status(400).json({
          status: 'fail',
          data: JSON.parse(result.error.message)
        })
      }

      const data = await loginModel.login({ ...result.data })
      return res.status(201).json({
        status: 'success',
        message: `Access successfully`,
        data
      })
    } catch (err) {
      next(err)
    }
  }
}
