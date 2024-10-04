import express, {Express, Request, Response} from 'express'
import { PORT } from './secrets'
import mainRouter from './routes'
import { PrismaClient } from '@prisma/client'

const app:Express = express()

app.use(express.json())

app.use('/api/v1/', mainRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.listen(PORT, () => {
    console.log('Server start in Port:', PORT)
})