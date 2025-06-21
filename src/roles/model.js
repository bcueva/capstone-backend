import { executeQuery, getConnection } from '../../db/mysql.js'
import { BaseModel } from '../base/model.js'

export class RolesModel extends BaseModel {
  constructor() {
    super({ tableName: 'role' })
  }

  async getAll() {
    const query = `SELECT r.*, GROUP_CONCAT(p.id) AS permissions,
      GROUP_CONCAT(p.name SEPARATOR ', ') AS concatenated_permissions FROM role AS r 
      LEFT JOIN role_permission AS rp ON r.id = rp.role_id
      LEFT JOIN permission AS p ON p.id = rp.permission_id
      GROUP BY r.id`
    const roles = await executeQuery(query)
    roles.forEach(role => {
      role.permissions = role.permissions?.split(',').reduce((obj, item) => {
        obj[item] = true
        return obj
      }, {})
    })
    return roles
  }

  async getById({ id }) {
    const query = `SELECT r.*, GROUP_CONCAT(p.id) AS permissions,
      GROUP_CONCAT(p.name SEPARATOR ', ') AS concatenated_permissions FROM role AS r 
      LEFT JOIN role_permission AS rp ON r.id = rp.role_id
      LEFT JOIN permission AS p ON p.id = rp.permission_id
      WHERE r.id = ?
      GROUP BY r.id`
    const roles = await executeQuery(query, [id])
    roles[0].permissions = roles[0].permissions?.split(',').reduce((obj, item) => {
      obj[item] = true
      return obj
    }, {})
    return roles[0] || null
  }

  async create({ input }) {
    const { permissions, ...inputItemType } = input
    const role = await super.create({ input: inputItemType })
    const connection = await getConnection()

    try {
      const activepermissionIds = Object.keys(permissions)
        .filter(key => permissions[key])

      for (const permissionId of activepermissionIds) {
        await connection.query(
          'INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?);',
          [role.id, permissionId]
        )
      }
    } finally {
      connection.release()
    }

    return this.getById({ id: role.id })
  }

  async update({ id, input }) {
    const { permissions, ...inputItemType } = input
    const role = await super.update({ id, input: inputItemType })
    const connection = await getConnection()

    if (permissions) {
      const activePermissionIds = Object.keys(permissions)
        .filter(key => permissions[key])

      const desactivePermissionIds = Object.keys(permissions)
        .filter(key => !permissions[key])

      try {
        for (const permissionId of activePermissionIds) {
          await connection.query(
            'INSERT IGNORE INTO role_permission (role_id, permission_id) VALUES (?, ?);',
            [id, permissionId]
          )
        }

        for (const permissionId of desactivePermissionIds) {
          await connection.query(
            'DELETE FROM role_permission WHERE role_id = ? AND permission_id = ?;',
            [id, permissionId]
          )
        }
      } finally {
        connection.release()
      }
    }

    return this.getById({ id: role.id })
  }

  async delete({ id }) {
    const query = 'DELETE FROM role WHERE id = ?;'
    const result = await executeQuery(query, [id])
    return result.affectedRows > 0
  }
}
