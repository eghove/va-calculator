export const AUTH_CONFIG = {

    domain: process.env.AUTH0_DOMAIN || 'dev-lk5g0n3x.auth0.com',
    clientId: process.env.AUTH0_CLIENT_ID || '2uUsy8IVMwRpaketcJOz75qIXTSgVaGh',
    callbackUrl: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}