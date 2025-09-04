import dotenv from 'dotenv'
import { findUp } from 'find-up'

dotenv.config({ path: await findUp('.env', {}) })

// Map LOGTO_DATABASE_URL to DB_URL for compatibility with root env
if (process.env.LOGTO_DATABASE_URL && !process.env.DB_URL) {
	process.env.DB_URL = process.env.LOGTO_DATABASE_URL
}

await import('./main.js')
