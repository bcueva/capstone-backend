export const {
  PORT = 3000,
  JWT_SECRET = 'secret',
  SALT_ROUNDS = 10,
  MAX_UPLOAD_SIZE = 1 * 1024 * 1024
} = process.env
