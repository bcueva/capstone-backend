import { Router } from 'express'
import { DashboardController } from './controller.js'

const dashboardRouter = Router()
const dashboardController = new DashboardController()

dashboardRouter.get('/getMonthlySales', dashboardController.getMonthlySales)
dashboardRouter.get('/getCumulativeSales', dashboardController.getCumulativeSales)
dashboardRouter.get('/getDistributionProducts', dashboardController.getDistributionProducts)

export default dashboardRouter
