import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return null
    if (!user) return <Navigate to="/log-in" replace state={{ from: location }} />

    return <>{children}</>
}


