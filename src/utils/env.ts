import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"]

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`)
  }
})

export const ENV = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!
}