import express, { json } from 'express'
import cors from 'cors'
import { PORT } from './config/app.js'
import router from './routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(json())
app.use(cors('*'))

app.use('/api/v1', router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
