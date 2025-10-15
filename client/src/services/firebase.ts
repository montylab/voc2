import {initializeApp, type FirebaseApp} from 'firebase/app'

export interface FirebaseClientConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	databaseURL?: string;
}

let appInstance: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp {
	if (appInstance) {
		return appInstance
	}

	const config: FirebaseClientConfig = {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
		appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
		databaseURL: (import.meta.env.VITE_FIREBASE_DATABASE_URL as string) || undefined,
	}

	appInstance = initializeApp(config)
	return appInstance
}


