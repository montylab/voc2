import React, { useRef, useState } from 'react'

export type AllowedFile = File & { name: string; size: number; type: string }

export interface FileUploadProps {
    onFileSelected: (file: AllowedFile | null) => void;
    maxBytes?: number; // default 5MB
}

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = '.txt,.srt'

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, maxBytes = DEFAULT_MAX_BYTES }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<AllowedFile | null>(null)
    const [error, setError] = useState<string>('')

    function validateAndSet(next: File | null) {
        setError('')
        if (!next) {
            setFile(null)
            onFileSelected(null)
            return
        }
        const lower = next.name.toLowerCase()
        const isAllowed = lower.endsWith('.txt') || lower.endsWith('.srt')
        if (!isAllowed) {
            setError('Only .txt or .srt files are allowed')
            setFile(null)
            onFileSelected(null)
            return
        }
        if (next.size > maxBytes) {
            setError('File exceeds 5MB limit')
            setFile(null)
            onFileSelected(null)
            return
        }
        const allowed = next as AllowedFile
        setFile(allowed)
        onFileSelected(allowed)
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                onChange={(e) => validateAndSet(e.target.files?.[0] ?? null)}
            />
            {file && (
                <div>
                    Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)
                    <button onClick={() => validateAndSet(null)}>Clear</button>
                </div>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    )
}
