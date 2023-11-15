import express from 'express'
import FinderRouter from '../routes/finder.routes'

const app = express()

app.use(FinderRouter)

export default app