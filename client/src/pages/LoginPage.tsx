import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { SignInButton } from '../components/SignInButton'

export const LoginPage: React.FC = () => {
    const { loading, signInWithGoogle } = useAuth()
    return (
        <div>
            <h2>Log in</h2>
            <SignInButton onClick={() => void signInWithGoogle()} disabled={loading} />
        </div>
    )
}


