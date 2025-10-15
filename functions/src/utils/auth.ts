import type { Request, Response, NextFunction } from 'express'
import { initializeApp, getApps } from 'firebase-admin/app'
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth'

export interface AuthedRequest extends Request {
	user?: DecodedIdToken;
}

function ensureAdminInitialized(): void {
	if (getApps().length === 0) {
		initializeApp()
	}
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
	ensureAdminInitialized()
	const authHeader = req.header('authorization') || req.header('Authorization')
	if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
		res.status(401).json({ error: 'Missing or invalid Authorization header' })
		return
	}

	const idToken = authHeader.substring(7).trim()
	if (!idToken) {
		res.status(401).json({ error: 'Invalid bearer token' })
		return
	}


	getAuth()
		.verifyIdToken(idToken)
		.then((decoded) => {
			req.user = decoded
			next()
		})
		.catch(() => {
			res.status(403).json({ error: 'Unauthorized' })
		})
}


