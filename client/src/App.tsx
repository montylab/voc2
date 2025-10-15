import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import style from './App.module.css'
import {useAuth} from './hooks/useAuth'
import {SignInButton} from './components/SignInButton'

function App() {
	const [count, setCount] = useState(0)
	const { user, loading, signInWithGoogle, signOut } = useAuth()

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className={style.logo} alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className={style.logoReact} alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div>
				{loading ? (
					<span>Loading auth…</span>
				) : user ? (
					<div>
						<div>Signed in as {user.email ?? user.uid}</div>
						<button onClick={() => void signOut()}>Sign out</button>
					</div>
				) : (
					<SignInButton onClick={() => void signInWithGoogle()} disabled={loading} />
				)}
			</div>
			<div className={style.card}>
				<button onClick={() => setCount((count) => count + 1)}>
          count is {count}
				</button>
				<p>
          Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className={style.readTheDocs}>
        Click on the Vite and React logos to learn more..
			</p>
		</>
	)
}

export default App
