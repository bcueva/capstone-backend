import { DashboardModel } from './model.js'

const dashboardModel = new DashboardModel()

export class DashboardController {
  getMonthlySales = async (req, res, next) => {
    try {
      const data = await dashboardModel.getMonthlySales({ ...req.body })
      return res.status(200).json({
        status: 'success',
        message: `Access successfully`,
        data
      })
    } catch (err) {
      next(err)
    }
  }

  getCumulativeSales = async (req, res, next) => {
    try {
      const data = await dashboardModel.getCumulativeSales({ ...req.body })
      return res.status(200).json({
        status: 'success',
        message: `Access successfully`,
        data
      })
    } catch (err) {
      next(err)
    }
  }

  getDistributionProducts = async (req, res, next) => {
    try {
      const data = await dashboardModel.getDistributionProducts({ ...req.body })
      return res.status(200).json({
        status: 'success',
        message: `Access successfully`,
        data
      })
    } catch (err) {
      next(err)
    }
  }
}
