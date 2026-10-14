import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('apn_token')
    const userData = localStorage.getItem('apn_user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('apn_token')
    localStorage.removeItem('apn_user')
    setIsLoggedIn(false)
    setUser(null)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span className="topbar-item">📞 +91 98765 43210</span>
            <span className="topbar-item">✉️ info@agrapropertynetwork.com</span>
          </div>
          <div className="topbar-right">
            <span className="topbar-item">📍 Agra, Uttar Pradesh</span>
          </div>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <div className="logo-icon">AP</div>
            <span>Agra Property Network</span>
          </Link>

          <nav className="main-nav">
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            <Link to="/listings?listing_type=sale" className={location.pathname === '/listings' && location.search.includes('sale') ? 'active' : ''}>Buy Property</Link>
            <Link to="/listings?listing_type=rent" className={location.pathname === '/listings' && location.search.includes('rent') ? 'active' : ''}>Rent</Link>
            <Link to="/post-property" className={isActive('/post-property') ? 'active' : ''}>Sell Property</Link>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-avatar">{user?.full_name?.charAt(0).toUpperCase() || 'U'}</div>
                <div className="user-dropdown">
                  <Link to="/dashboard">📊 Dashboard</Link>
                  <Link to="/dashboard?tab=properties">🏠 My Properties</Link>
                  <Link to="/dashboard?tab=enquiries">📧 Enquiries</Link>
                  <Link to="/dashboard?tab=profile">⚙️ Profile Settings</Link>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>🚪 Logout</a>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
              </>
            )}
            <Link to="/post-property" className="btn btn-primary btn-sm">Post Your Property</Link>
            <button className="hamburger" onClick={() => setMobileMenuOpen(true)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="logo"><div className="logo-icon">AP</div><span>APN</span></span>
          <button className="modal-close" onClick={() => setMobileMenuOpen(false)}>&times;</button>
        </div>
        <div className="mobile-menu-nav">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/listings?listing_type=sale" onClick={() => setMobileMenuOpen(false)}>Buy Property</Link>
          <Link to="/listings?listing_type=rent" onClick={() => setMobileMenuOpen(false)}>Rent</Link>
          <Link to="/post-property" onClick={() => setMobileMenuOpen(false)}>Sell Property</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
            </>
          )}
          <Link to="/post-property" className="btn btn-primary btn-block" style={{ marginTop: '8px' }} onClick={() => setMobileMenuOpen(false)}>Post Your Property</Link>
        </div>
      </div>
    </>
  )
}
