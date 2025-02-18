import dotenv from 'dotenv'

dotenv.config()
export const PORT = process.env.SERVER_PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET!