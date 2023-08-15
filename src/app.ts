import 'express-async-errors'
import express, { Request, Response } from 'express'
import { routers } from './router/index.router'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routers)


app.use('*', (req: Request, res: Response) => {
  throw new Error('Rota não encontrada')
})

const port = process.env.PORT || 3000
const ambient = process.env.NODE_ENV || 'develop'
app.listen(port, async () => {
  console.log(`App started in port: ${port} and environment: ${ambient}`)
})
