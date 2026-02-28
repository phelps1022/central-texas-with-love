import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageSEO } from '../hooks/usePageSEO'
import { useProductsContext } from '../context/ProductsContext'

export default function Contact() {
  usePageSEO({
    title: 'Contact — Handmade Art Inquiries & Local Delivery | Central Texas with Love, Austin TX',
    description: 'Get in touch about handcrafted driftwood sculptures, custom orders, or local Austin delivery. $10 minimum delivery, $1/lb anywhere in Austin.',
  })
  const { getProductById } = useProductsContext()
  const [searchParams] = useSearchParams()
  const pieceId = searchParams.get('piece')
  const product = pieceId ? getProductById(pieceId) : null

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    if (product) {
      setSubject('Interested in a Piece')
      setMessage(`Hi! I'm interested in the "${product.name}" piece ($${product.price}). Could you tell me more about availability?`)
    }
  }, [product])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return

    setSubmitting(true)
    setSubmitError(false)

    const payload = JSON.stringify({
      name,
      email,
      phone,
      subject,
      message,
      piece: product ? `${product.name} ($${product.price})` : '',
      timestamp: new Date().toISOString(),
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      if (!res.ok) throw new Error(`Contact failed: ${res.status}`)
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ paddingTop: '90px' }}>
      {/* Hero */}
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Left - Info */}
            <div>
              <span className="label" style={{ marginBottom: '20px' }}>Get In Touch</span>
              <h1 className="heading-xl" style={{ marginBottom: '20px' }}>
                Let's <span className="text-accent">Connect</span>
              </h1>
              <p className="text-lg text-muted" style={{ marginBottom: '40px', maxWidth: '400px' }}>
                Interested in a piece? Want a custom creation? Have questions about UV
                reactivity or plant care? I'd love to hear from you.
              </p>

              {/* Delivery Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px' }}>🚗</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>Delivery</p>
                    <p className="text-muted" style={{ fontSize: '14px' }}>$10 minimum, $1/lb — Anywhere in Austin</p>
                  </div>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px' }}>🏠</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>Free Pickup</p>
                    <p className="text-muted" style={{ fontSize: '14px' }}>At my home studio</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📍</span> Austin, Texas
                </p>
                <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📧</span> evan@centraltexaswithlove.com
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {product && (
                <div className="card" style={{ display: 'flex', gap: '16px', padding: '16px', marginBottom: '20px', alignItems: 'center' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="text-accent" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2px' }}>
                      INQUIRING ABOUT
                    </p>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: 700 }}>${product.price}</p>
                  </div>
                  <p className="text-muted" style={{ fontSize: '12px', flexShrink: 0 }}>{product.dimensions}</p>
                </div>
              )}
              <div className="card" style={{ padding: '32px' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                    <h2 className="heading-md" style={{ marginBottom: '12px' }}>Message Sent!</h2>
                    <p className="text-muted">
                      Thanks {name}! Evan will be in touch soon at {email}.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="heading-md" style={{ marginBottom: '28px' }}>Send a Message</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="form-name-email" style={{ display: 'grid', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Name *</label>
                          <input
                            type="text"
                            placeholder="Your name"
                            className="input"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Email *</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="input"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Phone</label>
                        <input
                          type="tel"
                          placeholder="(512) 555-1234"
                          className="input"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Subject</label>
                        <select className="input" value={subject} onChange={e => setSubject(e.target.value)}>
                          <option>General Inquiry</option>
                          <option>Interested in a Piece</option>
                          <option>Custom Order Request</option>
                          <option>Delivery Question</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Message *</label>
                        <textarea
                          rows={3}
                          placeholder="Tell me what you're looking for..."
                          className="input"
                          style={{ resize: 'none' }}
                          required
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                        />
                      </div>
                      {submitError && (
                        <p style={{ color: '#c0392b', fontSize: '14px' }}>
                          Something went wrong. Please try again or email evan@centraltexaswithlove.com directly.
                        </p>
                      )}
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%' }}
                        disabled={submitting}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              FREQUENTLY ASKED
            </p>
            <h2 className="heading-lg">Common Questions</h2>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: 'How do I care for the air plants?',
                a: "Air plants are incredibly low-maintenance. Simply mist them with water once a week, or soak them for 20 minutes every two weeks. Keep them in indirect light and they'll thrive for years.",
              },
              {
                q: 'Do I need a special UV light?',
                a: 'Any blacklight or UV flashlight will work! You can find inexpensive UV bulbs at most hardware stores. The fluorescent elements will glow beautifully under any UV source.',
              },
              {
                q: 'Can I request a custom piece?',
                a: "Absolutely! I love creating custom pieces. Send me a message with your ideas, preferred size, and any specific materials you'd like.",
              },
              {
                q: 'How are pieces delivered?',
                a: 'I personally deliver anywhere in Austin — $10 minimum, $1 per pound. Free pickup is also available at my home studio.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card"
              >
                <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '10px' }}>{item.q}</h3>
                <p className="text-muted" style={{ lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I care for the air plants?",
              "acceptedAnswer": { "@type": "Answer", "text": "Air plants are incredibly low-maintenance. Simply mist them with water once a week, or soak them for 20 minutes every two weeks. Keep them in indirect light and they'll thrive for years." }
            },
            {
              "@type": "Question",
              "name": "Do I need a special UV light?",
              "acceptedAnswer": { "@type": "Answer", "text": "Any blacklight or UV flashlight will work! You can find inexpensive UV bulbs at most hardware stores. The fluorescent elements will glow beautifully under any UV source." }
            },
            {
              "@type": "Question",
              "name": "Can I request a custom piece?",
              "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Send a message with your ideas, preferred size, and any specific materials you'd like." }
            },
            {
              "@type": "Question",
              "name": "How are pieces delivered in Austin?",
              "acceptedAnswer": { "@type": "Answer", "text": "We personally deliver anywhere in Austin — $10 minimum, $1 per pound. Free pickup is also available at the home studio." }
            }
          ]
        }) }}
      />
    </div>
  )
}
