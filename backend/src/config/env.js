import dotenv from "dotenv"

dotenv.config({ quite: true })
export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
}