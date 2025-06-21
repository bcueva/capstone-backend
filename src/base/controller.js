export class BaseController {
  constructor ({ name, model, validations }) {
    this.name = name
    this.model = model
    this.validations = validations
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.model.getAll()
      return res.status(200).json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }

  getById = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'ID is required' })
    }

    try {
      const item = await this.model.getById({ id })

      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `${this.name} not found`
        })
      }

      return res.status(200).json({ status: 'success', data: item })
    } catch (err) {
      next(err)
    }
  }

  getBySlug = async (req, res, next) => {
    const { slug } = req.params
    if (!slug) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Slug is required' })
    }

    try {
      const item = await this.model.getBySlug({ slug })

      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `${this.name} not found`
        })
      }

      return res.status(200).json({ status: 'success', data: item })
    } catch (err) {
      next(err)
    }
  }

  create = async (req, res, next) => {
    try {
      const result = this.validations.create(req.body)
      if (!result.success) {
        return res.status(400).json({
          status: 'fail',
          data: JSON.parse(result.error.message)
        })
      }

      const newItem = await this.model.create({ input: result.data })
      return res.status(201).json({
        status: 'success',
        message: `${this.name} created successfully`,
        data: newItem
      })
    } catch (err) {
      next(err)
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'ID is required' })
    }

    try {
      const result = this.validations.update(req.body)
      if (!result.success) {
        return res.status(400).json({
          status: 'fail',
          message: JSON.parse(result.error.message)
        })
      }

      const updatedItem = await this.model.update({
        id,
        input: result.data
      })
      return res.status(200).json({ status: 'success', data: updatedItem })
    } catch (err) {
      next(err)
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'ID is required' })
    }

    try {
      const result = await this.model.delete({ id })
      if (!result) {
        return res.status(404).json({
          status: 'fail',
          message: `${this.name} not found`
        })
      }

      return res.status(200).json({
        status: 'success',
        message: `${this.name} successfully deleted`
      })
    } catch (err) {
      next(err)
    }
  }
}
