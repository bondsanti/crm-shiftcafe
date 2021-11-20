import express from 'express'
import passport from 'passport'
import cors from 'cors'
import indexRoute from './routes'
import errorHandler from './middleware/error.middleware'

const app = express()

app.use(
  cors({
    origin: ['https://app.shift-cafe.com'],
  })
)
app.use(express.urlencoded())
app.use(express.json({ limit: '20mb' }))
app.use(passport.initialize())
app.use('/', indexRoute)
app.use(errorHandler)

export default {
  path: '/server',
  handler: app,
}
