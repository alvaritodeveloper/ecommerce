import { Request, Response } from 'express'
import { prismaClient } from '..'
import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'

export const login = async (req: Request, res: Response) => {
    const { name, password } = req.body

    let user = await prismaClient.user.findFirst({ where: { name } })
    if (!user) {
        return res.status(400).json({ message: 'User does not exists' })
    }
    if(!compareSync(password, user.password)){
        return res.status(400).json({ message: 'User does not exists' })
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET)
    res.json({user, token})
}

export const singup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } })
    if (user) {
        return res.status(400).json({ message: 'User already exists' })
    }

    user = await prismaClient.user.create({
        data: {
            email,
            password: hashSync(password, 10),
            name
        }
    })
    res.json(user)
}