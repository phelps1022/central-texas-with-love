import type { VercelRequest, VercelResponse } from '@vercel/node'

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    return res.status(500).json({ error: 'Server configuration missing' })
  }

  const records: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/Products`)
    url.searchParams.set('filterByFormula', 'NOT({Sold})')
    if (offset) url.searchParams.set('offset', offset)

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch products' })
    }

    const data = await response.json() as { records: AirtableRecord[]; offset?: string }
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  const products = records
    .map((record) => {
      const f = record.fields
      if (!f['Name'] || !f['Price']) return null

      const imageAttachments = f['Image'] as Array<{ url: string }> | undefined
      const image = imageAttachments?.[0]?.url ?? ''

      return {
        id: record.id,
        name: f['Name'] as string,
        price: f['Price'] as number,
        description: (f['Description'] as string) ?? '',
        dimensions: (f['Dimensions'] as string) ?? '',
        weight: (f['Weight'] as string) ?? '',
        image,
        category: (f['Category'] as string) ?? 'Other',
        tags: Array.isArray(f['Tags']) ? f['Tags'] : [],
        featured: (f['Featured'] as boolean) ?? false,
      }
    })
    .filter(Boolean)

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  return res.status(200).json(products)
}
