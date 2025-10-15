import React from 'react'
import { useParams } from 'react-router-dom'

export const WizardPage: React.FC = () => {
    const { wizardId } = useParams()
    return (
        <div>
            <h2>Wizard</h2>
            <p>Wizard ID: {wizardId}</p>
        </div>
    )
}


