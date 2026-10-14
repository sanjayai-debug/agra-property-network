import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Cart.css'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  const savings = cart.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="cart-count-text">{cartCount} item(s) in cart</p>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span className="item-category">{item.category}</span>
                  <div className="item-price">
                    <span className="price">Rs.{item.price}</span>
                    <span className="original-price">Rs.{item.originalPrice}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  Rs.{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>Rs.{cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">{cartTotal >= 499 ? 'FREE' : 'Rs.49'}</span>
            </div>
            <div className="summary-row savings">
              <span>You Save</span>
              <span>- Rs.{savings}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs.{cartTotal + (cartTotal >= 499 ? 0 : 49)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
