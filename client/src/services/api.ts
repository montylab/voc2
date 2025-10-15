import { getAuth } from 'firebase/auth'

export interface StartWizardResponse {
    wizardId: string;
}

const FUNCTIONS_BASE_URL = import.meta.env.VITE_FUNCTIONS_BASE_URL as string

export async function startWizard(text: string): Promise<StartWizardResponse> {
    const auth = getAuth()
    const idToken = await auth.currentUser?.getIdToken()
    if (!idToken) {
        throw new Error('Not authenticated')
    }
    const url = `${FUNCTIONS_BASE_URL}/api/wizard/start`
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ text }),
    })
    if (!res.ok) {
        const info = await res.json().catch(() => ({}))
        throw new Error(info?.error || `Failed to start wizard (${res.status})`)
    }
    return (await res.json()) as StartWizardResponse
}


