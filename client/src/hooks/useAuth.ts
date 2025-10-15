import { useEffect, useMemo, useState } from 'react'
import { createAuthService } from '../services/auth'
import type { User } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'

export interface UseAuthResult {
	user: User | null;
	loading: boolean;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
	const authService = useMemo(() => createAuthService(), [])
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const unsubscribe = authService.subscribe((nextUser) => {
			setUser(nextUser)
			setLoading(false)
		})
		return unsubscribe
	}, [authService])

	useEffect(() => {
		if (loading) return

		if (!user) {
			// On sign-out, send back to /log-in if not already there
			if (location.pathname !== '/log-in') {
				navigate('/log-in', { replace: true })
			}
			return
		}

		// On sign-in: if currently on /log-in, go to /
		if (location.pathname === '/log-in') {
			navigate('/', { replace: true })
		}
	}, [user, loading, location.pathname, navigate])

	return {
		user,
		loading,
		signInWithGoogle: async () => {
			await authService.signInWithGoogle()
		},
		signOut: async () => {
			await authService.signOut()
		},
	}
}
