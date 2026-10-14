import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && (
          <span className={`badge badge-${product.badge}`}>
            {product.badge === 'hot' ? 'Hot' : product.badge === 'sale' ? 'Sale' : 'New'}
          </span>
        )}
        <button
          className="quick-add"
          onClick={() => addToCart(product)}
          aria-label="Add to cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="price">Rs.{product.price}</span>
          <span className="original-price">Rs.{product.originalPrice}</span>
          <span className="discount">{product.discount}% OFF</span>
        </div>
        <button className="btn btn-primary add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
