import express from 'express'

import indexRoute from './routes'
import errorHandler from './middleware/error.middleware'

const app = express()
app.use(express.urlencoded())
app.use(express.json({ limit: '20mb' }))

app.use('/', indexRoute)
app.use(errorHandler)

export default {
  path: '/server',
  handler: app,
}
