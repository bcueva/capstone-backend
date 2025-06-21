import mysql from 'mysql2/promise'
import config from '../config/db.js'

const pool = mysql.createPool(config)

export async function executeQuery (query, params = []) {
  const [rows] = await pool.execute(query, params)
  return rows || []
}

export async function getConnection () {
  return await pool.getConnection()
}
