import { Router } from 'express'
import { LoginController } from './controller.js'

const loginRouter = Router()
const loginController = new LoginController()

loginRouter.post('/', loginController.login)

export default loginRouter
