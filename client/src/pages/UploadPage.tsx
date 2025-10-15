import React, { useState } from 'react'
import { FileUpload, type AllowedFile } from '../components/FileUpload'
import { parseTextFromFile } from '../utils/parseText'
import { useNavigate } from 'react-router-dom'
import { startWizard } from '../services/api'

export const UploadPage: React.FC = () => {
    const [file, setFile] = useState<AllowedFile | null>(null)
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    async function onContinue() {
        setError('')
        setText('')
        if (!file) return
        try {
            const extracted = await parseTextFromFile(file)
            if (!extracted) {
                setError('No text content found.')
                return
            }
            setText(extracted)

            const data = await startWizard(extracted)
            navigate(`/wizard/${data.wizardId}`)
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to parse file')
        }
    }

    return (
        <div>
            <h2>Upload</h2>
            <p>Allowed: .txt, .srt. Max size: 5MB.</p>
            <FileUpload onFileSelected={setFile} />
            <button disabled={!file} onClick={() => void onContinue()}>Continue</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {text && (
                <div>
                    <h3>Preview</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{text.slice(0, 1000)}</pre>
                </div>
            )}
        </div>
    )
}


