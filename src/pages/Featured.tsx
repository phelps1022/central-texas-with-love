import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { type Product } from '../data/products'
import { useProductsContext } from '../context/ProductsContext'
import { usePageSEO } from '../hooks/usePageSEO'

export default function Featured() {
  const { featuredProducts, loading } = useProductsContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  usePageSEO({
    title: 'Featured Pieces | Handmade Driftwood & Air Plant Art — Central Texas with Love',
    description:
      'Hand-selected featured pieces from Central Texas with Love. Handcrafted in Austin from driftwood, coral stone, and living air plants.',
  })

  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(100px, 12vw, 140px)' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <Link
              to="/"
              className="text-accent"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              ← BACK TO HOME
            </Link>
            <p
              className="text-accent"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}
            >
              Hand-Selected
            </p>
            <h1 className="heading-xl" style={{ marginBottom: '16px' }}>
              Featured Pieces
            </h1>
            <p className="text-muted" style={{ maxWidth: '600px' }}>
              A curated selection of current favorites — each one handcrafted in Austin from Texas
              driftwood, coral stone, and living air plants.
            </p>
          </div>

          {loading ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p className="text-muted">Loading pieces...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid-3">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="img-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '12px',
                    }}
                  >
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{product.name}</h3>
                    <p style={{ fontWeight: 700, color: 'var(--color-forest)' }}>
                      ${product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '80px 0',
                textAlign: 'center',
                background: 'var(--color-cream-dark)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <p className="text-muted">No featured pieces right now — check back soon.</p>
            </div>
          )}

          {/* Browse All Categories */}
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <p className="text-muted" style={{ marginBottom: '20px' }}>
              Browse the full collection by category
            </p>
            <Link to="/#categories" className="btn-secondary">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="modal-wrapper"
        style={{
          position: 'fixed',
          inset: '20px',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="card product-modal-card"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'hidden',
            padding: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'white',
              border: 'none',
              cursor: 'pointer',
              zIndex: 110,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '14px',
            }}
          >
            ✕
          </button>
          <div className="product-modal-grid">
            <div className="modal-image-container">
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="modal-details">
              <div>
                <p
                  className="text-accent"
                  style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}
                >
                  {product.category.toUpperCase()}
                </p>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: '22px',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  {product.name}
                </h2>
                <p
                  className="text-accent"
                  style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}
                >
                  ${product.price}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    padding: '8px 14px',
                    background: 'var(--color-cream-dark)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '12px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span
                      className="text-muted"
                      style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      DIMENSIONS{' '}
                    </span>
                    <span style={{ fontWeight: 500 }}>{product.dimensions}</span>
                  </div>
                  <div>
                    <span
                      className="text-muted"
                      style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      WEIGHT{' '}
                    </span>
                    <span style={{ fontWeight: 500 }}>{product.weight}</span>
                  </div>
                </div>
                {product.description && (
                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                    {product.description}
                  </p>
                )}
              </div>
              <Link
                to={`/contact?piece=${product.id}`}
                className="btn-primary"
                style={{ justifyContent: 'center', fontSize: '14px', padding: '12px 24px' }}
              >
                Inquire About This Piece
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
