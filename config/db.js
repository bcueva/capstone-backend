const {
  DATABASE_HOST = 'localhost',
  DATABASE_PORT = 3306,
  DATABASE_USER = 'root',
  DATABASE_PASSWORD = 'admin',
  DATABASE_NAME = 'capstone_db'
} = process.env

export default {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
}
