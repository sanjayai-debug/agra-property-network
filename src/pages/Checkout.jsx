import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Checkout.css'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId] = useState('ORD' + Date.now().toString().slice(-8))

  const shipping = cartTotal >= 499 ? 0 : 49
  const total = cartTotal + shipping

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handlePayment = () => {
    // Simulate Razorpay payment
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for shopping with Shopkartdeals</p>
            <div className="order-details">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Total Paid:</strong> Rs.{total}</p>
              <p><strong>Payment Method:</strong> {formData.paymentMethod.toUpperCase()}</p>
            </div>
            <p className="delivery-estimate">Estimated delivery: 3-5 business days</p>
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products before checkout</p>
            <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Review</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Payment</span>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Step 1: Shipping Info */}
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required maxLength="6" />
                </div>
                <button type="submit" className="btn btn-primary">Continue to Review</button>
              </form>
            )}

            {/* Step 2: Review Order */}
            {step === 2 && (
              <div>
                <h2>Review Your Order</h2>
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                  <p>Phone: {formData.phone}</p>
                  <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
                </div>
                <div className="review-section">
                  <h3>Order Items</h3>
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="item-price">Rs.{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)}>Proceed to Payment</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <label className={`payment-method ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                    <div className="payment-info">
                      <strong>UPI</strong>
                      <span>Google Pay, PhonePe, Paytm</span>
                    </div>
                  </label>
                  <label className={`payment-method ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                    <div className="payment-info">
                      <strong>Credit/Debit Card</strong>
                      <span>Visa, Mastercard, RuPay</span>
                    </div>
                  </label>
                  <label className={`payment-method ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                    <div className="payment-info">
                      <strong>Cash on Delivery</strong>
                      <span>Pay when you receive</span>
                    </div>
                  </label>
                </div>
                <div className="razorpay-info">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Razorpay_Logo.svg/200px-Razorpay_Logo.svg.png" alt="Razorpay" onError={(e) => e.target.style.display = 'none'} />
                  <p>Secured by Razorpay</p>
                </div>
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-accent" onClick={handlePayment}>
                    Pay Rs.{total}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">Rs.{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs.{cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `Rs.${shipping}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs.{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
