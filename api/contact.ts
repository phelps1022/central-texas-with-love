import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    return res.status(500).json({ error: 'Server configuration missing' })
  }

  const { name, email, phone, subject, message, piece, timestamp } = req.body as Record<string, string>

  const response = await fetch(`https://api.airtable.com/v0/${baseId}/Inquiries`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Name: name,
        Email: email,
        Phone: phone || '',
        Subject: subject,
        Message: message,
        Piece: piece || '',
        Timestamp: timestamp,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Airtable error:', error)
    return res.status(502).json({ error: 'Failed to save inquiry' })
  }

  return res.status(200).json({ ok: true })
}
