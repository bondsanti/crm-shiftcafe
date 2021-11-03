import express from 'express'
import cors from 'cors'
import indexRoute from './routes'
import errorHandler from './middleware/error.middleware'

const app = express()
app.use(express.urlencoded())
app.use(express.json({ limit: '20mb' }))
// app.use(cors())
app.use(
  cors({
    origin: [
      'http://192.168.1.55:3000',
      'https://shiftcafe.th.app.ruk-com.cloud/',
    ],
  })
)
app.use('/', indexRoute)
app.use(errorHandler)

export default {
  path: '/server',
  handler: app,
}
