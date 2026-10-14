import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Product Media */}
          <div className="product-media">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className={`badge badge-${product.badge}`}>
                  {product.badge === 'hot' ? 'Hot' : product.badge === 'sale' ? 'Sale' : 'New'}
                </span>
              )}
            </div>
            {product.video && (
              <div className="product-video">
                <h4>Product Video</h4>
                <video controls poster={product.image}>
                  <source src={product.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-details">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="product-meta">
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-value">{product.rating}</span>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>
              <span className="sold-count">{product.sold}+ sold</span>
            </div>

            <div className="price-section">
              <span className="current-price">Rs.{product.price}</span>
              <span className="original-price">Rs.{product.originalPrice}</span>
              <span className="discount-badge">{product.discount}% OFF</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} min="1" readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
              <button className="btn btn-accent">
                Buy Now
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tab-buttons">
            <button
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
            <button
              className={activeTab === 'shipping' ? 'active' : ''}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping Info
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div>
                <p>{product.description}</p>
                <p style={{ marginTop: '15px' }}>
                  This premium product is carefully curated to ensure the best quality and value for money.
                  Perfect for personal use or as a gift. Order now and experience the difference!
                </p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="reviews-list">
                <div className="review">
                  <div className="review-header">
                    <strong>Rahul S.</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                  <p>Excellent product! Exactly as described. Highly recommended.</p>
                </div>
                <div className="review">
                  <div className="review-header">
                    <strong>Priya M.</strong>
                    <span className="stars">★★★★☆</span>
                  </div>
                  <p>Good quality and fast delivery. Very satisfied with the purchase.</p>
                </div>
                <div className="review">
                  <div className="review-header">
                    <strong>Amit K.</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                  <p>Amazing value for money. Will definitely buy again!</p>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div>
                <p><strong>Standard Delivery:</strong> 3-5 business days</p>
                <p><strong>Express Delivery:</strong> 1-2 business days (Rs.99 extra)</p>
                <p><strong>Free Shipping:</strong> On orders above Rs.499</p>
                <p style={{ marginTop: '10px' }}>We ship across India. Cash on Delivery available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
