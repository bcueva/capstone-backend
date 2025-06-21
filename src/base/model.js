import { executeQuery } from '../../db/mysql.js'
import { slugify } from '../../utils/string.js'

export class BaseModel {
  constructor ({ tableName, slugField }) {
    this.tableName = tableName
    this.slugField = slugField
  }

  async generateSlug (value) {
    const baseSlug = slugify(value)
    let slug = baseSlug
    let counter = 1

    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter++}`
    }

    return slug
  }

  async slugExists (slug) {
    const query = `SELECT 1 FROM ${this.tableName} WHERE slug = ? LIMIT 1`
    const [row] = await executeQuery(query, [slug])
    return !!row
  }

  async getAll () {
    const query = `SELECT * FROM ${this.tableName}`
    const rows = await executeQuery(query)
    return rows
  }

  async getById ({ id }) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`
    const [row] = await executeQuery(query, [id])
    return row || null
  }

  async getBySlug ({ slug }) {
    const query = `SELECT * FROM ${this.tableName} WHERE slug = ? LIMIT 1`
    const [row] = await executeQuery(query, [slug])
    return row || null
  }

  async create ({ input }) {
    if (this.slugField && input[this.slugField]) {
      input.slug = await this.generateSlug(input[this.slugField])
    }

    const keys = Object.keys(input).join(', ')
    const placeholders = Object.keys(input).map(() => '?').join(', ')
    const values = Object.values(input)

    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`
    const result = await executeQuery(query, values)

    return this.getById({ id: result.insertId })
  }

  async update ({ id, input }) {
    if (this.slugField && input[this.slugField]) {
      input.slug = await this.generateSlug(input[this.slugField])
    }

    const updates = Object.keys(input).map(key => `${key} = ?`).join(', ')
    const values = [...Object.values(input), id]

    const query = `UPDATE ${this.tableName} SET ${updates} WHERE id = ?`
    const result = await executeQuery(query, values)

    if (result.affectedRows === 0) {
      return null
    }

    return this.getById({ id })
  }

  async delete ({ id }) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`
    const result = await executeQuery(query, [id])
    return result.affectedRows > 0
  }

  async deleteLogical ({ id }) {
    const query = `UPDATE ${this.tableName} SET is_deleted = TRUE WHERE id = ?`
    const result = await executeQuery(query, [id])
    return result.affectedRows > 0
  }
}
