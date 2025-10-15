export async function parseTextFromFile(file: File): Promise<string> {
    const name = file.name.toLowerCase()
    const raw = await file.text()

    if (name.endsWith('.txt')) {
        return normalize(raw)
    }
    if (name.endsWith('.srt')) {
        return parseSrt(raw)
    }
    throw new Error('Unsupported file type')
}

function normalize(text: string): string {
    return text.replace(/\r\n/g, '\n').trim()
}

function parseSrt(raw: string): string {
    const text = normalize(raw)
    const blocks = text.split(/\n\n+/)
    const lines: string[] = []

    for (const block of blocks) {
        const rows = block.split('\n')
        const content = rows.filter((row, idx) => {
            const r = row.trim()
            if (idx === 0 && /^\d+$/.test(r)) return false // index
            if (/^\d{2}:\d{2}:\d{2}[,.]\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}[,.]\d{3}/.test(r)) return false // time
            return r.length > 0
        })

        if (content.length > 0) {
            lines.push(content.join(' '))
        }
    }

    return lines.join('\n').trim()
}


