import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getAuth } from 'firebase/auth'

export const HomePage: React.FC = () => {
	const { user } = useAuth()
	const [secureResponse, setSecureResponse] = useState<string>('')

	async function callSecure() {
		const auth = getAuth()
		const token = await auth.currentUser?.getIdToken()
		if (!token) {
			setSecureResponse('No token available')
			return
		}
		const url = 'http://127.0.0.1:5001/voc2-a5b40/us-central1/api/api/secure/ping'
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${token}` },
		})
		const data = await res.json()
		setSecureResponse(JSON.stringify(data))
	}

	return (
		<div>
			<h2>Home</h2>
			<p>Welcome {user?.email ?? user?.uid ?? 'user'}!</p>
			<button onClick={() => void callSecure()} disabled={!user}>
				Call secure ping
			</button>
			{secureResponse && (
				<pre>{secureResponse}</pre>
			)}
		</div>
	)
}
