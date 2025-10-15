import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { UploadPage } from './pages/UploadPage'
import { WizardPage } from './pages/WizardPage'
import { RequireAuth } from './components/RequireAuth'

const router = createBrowserRouter([
	{ path: '/', element: <RequireAuth><HomePage /></RequireAuth> },
	{ path: '/log-in', element: <LoginPage /> },
	{ path: '/upload', element: <RequireAuth><UploadPage /></RequireAuth> },
	{ path: '/wizard/:wizardId', element: <RequireAuth><WizardPage /></RequireAuth> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
