import {getFirebaseApp} from './firebase'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	connectAuthEmulator,
	type Auth,
	type User,
} from 'firebase/auth'

export interface AuthService {
	readonly auth: Auth;
	signInWithGoogle: () => Promise<User>;
	signOut: () => Promise<void>;
	subscribe: (listener: (user: User | null) => void) => () => void;
}

let authSingleton: Auth | null = null

function ensureAuth(): Auth {
	if (authSingleton) return authSingleton
	const app = getFirebaseApp()
	const auth = getAuth(app) 
	if (import.meta.env.VITE_USE_EMULATORS === 'true') {
		// Use localhost to avoid CORS issues; uses port from firebase.json (9099)
		connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings: true})
	}
	authSingleton = auth
	return authSingleton
}

export function createAuthService(): AuthService {
	const auth = ensureAuth()
	const provider = new GoogleAuthProvider()

	return {
		auth,
		signInWithGoogle: async () => {
			const result = await signInWithPopup(auth, provider)
			return result.user
		},
		signOut: async () => {
			await signOut(auth)
		},
		subscribe: (listener) => onAuthStateChanged(auth, listener),
	}
}


