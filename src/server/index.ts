import express from 'express'
import cors from 'cors'
import FinderRouter from '../routes/finder.routes'

const app = express()

app.use(express.json());
app.use(cors())

app.use(FinderRouter)

export default app