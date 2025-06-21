import { executeQuery } from '../../db/mysql.js'
import { BaseModel } from '../base/model.js'

export class UsersModel extends BaseModel {
  constructor() {
    super({ tableName: 'user' })
  }

  async getAll () {
    const query = `SELECT u.id, u.name, u.last_name, u.email, u.phone, u.role_id, r.name as role
      FROM user AS u 
      LEFT JOIN role AS r ON r.id = u.role_id`
    return executeQuery(query)
  }

  async getById ({ id }) {
    const query = `SELECT u.id, u.name, u.last_name, u.email, u.phone, u.role_id, r.name as role
      FROM user AS u 
      LEFT JOIN role AS r ON r.id = u.role_id
      WHERE u.id = ?`
    const users = await executeQuery(query, [id])
    return users[0] || null
  }
}
