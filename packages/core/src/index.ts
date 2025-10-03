import dotenv from 'dotenv'
import { findUp } from 'find-up'

dotenv.config({ path: await findUp('.env', {}) })

// Environment variable mapping for compatibility with root env
const envMappings: Record<string, string> = {
	LOGTO_DATABASE_URL: 'DB_URL',
	LOGTO_CORE_PORT: 'PORT',
	LOGTO_ADMIN_PORT: 'ADMIN_PORT',
	LOGTO_ADMIN_ENDPOINT: 'ADMIN_ENDPOINT',
	LOGTO_CORE_ENDPOINT: 'ENDPOINT',
	LOGTO_TRUST_PROXY_HEADER: 'TRUST_PROXY_HEADER',
	LOGTO_DATABASE_CONNECTION_TIMEOUT: 'DATABASE_CONNECTION_TIMEOUT',
	LOGTO_APP_EMBED_ORIGIN: 'APP_EMBED_ORIGIN',
}

// Apply environment variable mappings
for (const [sourceVar, targetVar] of Object.entries(envMappings)) {
	if (process.env[sourceVar] && !process.env[targetVar]) {
		process.env[targetVar] = process.env[sourceVar]
	}
}

console.log('process.env:', process.env)

await import('./main.js')
