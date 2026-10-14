import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const PROPERTY_TYPES = [
  'Flat / Apartment', 'Independent House', 'Villa', 'Plot / Land',
  'Builder Floor', 'Commercial Shop', 'Office', 'Warehouse',
  'Industrial Property', 'Agricultural Land', 'Other'
]

const LOCATIONS = [
  'Shastripuram', 'Sikandra', 'Kamla Nagar', 'Dayalbagh',
  'Sanjay Place', 'Avas Vikas Colony', 'Bodla', 'Taj Nagari',
  'Fatehabad Road', 'Agra Cantt', 'Khandari', 'Balkeshwar', 'Civil Lines'
]

const PROPERTY_TYPE_IMAGES = [
  { type: 'Flat / Apartment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop', desc: 'Modern apartments with premium amenities' },
  { type: 'Independent House', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop', desc: 'Spacious independent houses for families' },
  { type: 'Villa', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop', desc: 'Luxurious villas with modern design' },
  { type: 'Plot / Land', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop', desc: 'Prime land parcels for investment' },
  { type: 'Commercial Shop', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop', desc: 'High-footfall commercial spaces' },
  { type: 'Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop', desc: 'Modern office spaces for businesses' },
]

function formatPrice(price) {
  if (!price && price !== 0) return 'Rs. --'
  price = Number(price)
  if (isNaN(price)) return 'Rs. --'
  if (price >= 10000000) return 'Rs. ' + (price / 10000000).toFixed(2) + ' Cr'
  if (price >= 100000) return 'Rs. ' + (price / 100000).toFixed(2) + ' L'
  if (price >= 1000) return 'Rs. ' + (price / 1000).toFixed(1) + ' K'
  return 'Rs. ' + price.toLocaleString('en-IN')
}

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchType, setSearchType] = useState('sale')
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      const res = await fetch('/api/properties/featured')
      const data = await res.json()
      setFeaturedProperties(data.properties || [])
    } catch (err) {
      console.error('Failed to fetch properties:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchType === 'sale') params.set('listing_type', 'sale')
    else if (searchType === 'rent') params.set('listing_type', 'rent')
    else if (searchType === 'commercial') params.set('property_type', 'Commercial Shop')
    else if (searchType === 'plots') params.set('property_type', 'Plot / Land')
    if (searchFilters.location) params.set('location', searchFilters.location)
    if (searchFilters.propertyType) params.set('property_type', searchFilters.propertyType)
    if (searchFilters.minPrice) params.set('min_price', searchFilters.minPrice)
    if (searchFilters.maxPrice) params.set('max_price', searchFilters.maxPrice)
    window.location.href = '/listings?' + params.toString()
  }

  return (
    <div className="home">
      {/* Hero Section - Blue Box Full Width */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Find Your Perfect Property in Agra</h1>
          <p className="hero-subtitle">Buy, Sell & Discover Residential and Commercial Properties Across Agra</p>
          <div className="hero-banner">
            <img src="/assets/image.png" alt="Agra Property Network" />
          </div>
        </div>
      </section>

      {/* Search Section - White Area */}
      <section className="search-section">
        <div className="container">
          <div className="search-box">
            <div className="search-tabs">
              {['sale', 'rent', 'commercial', 'plots'].map(type => (
                <button
                  key={type}
                  className={`search-tab ${searchType === type ? 'active' : ''}`}
                  onClick={() => setSearchType(type)}
                >
                  {type === 'sale' ? 'Buy' : type === 'rent' ? 'Rent' : type === 'commercial' ? 'Commercial' : 'Plots'}
                </button>
              ))}
            </div>
            <form className="search-fields" onSubmit={handleSearch}>
              <div className="search-field">
                <label>Location</label>
                <select value={searchFilters.location} onChange={e => setSearchFilters({...searchFilters, location: e.target.value})}>
                  <option value="">All Locations</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div className="search-field">
                <label>Property Type</label>
                <select value={searchFilters.propertyType} onChange={e => setSearchFilters({...searchFilters, propertyType: e.target.value})}>
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="search-field">
                <label>Min Price</label>
                <select value={searchFilters.minPrice} onChange={e => setSearchFilters({...searchFilters, minPrice: e.target.value})}>
                  <option value="">No Min</option>
                  <option value="500000">Rs. 5 L</option>
                  <option value="1000000">Rs. 10 L</option>
                  <option value="2500000">Rs. 25 L</option>
                  <option value="5000000">Rs. 50 L</option>
                  <option value="10000000">Rs. 1 Cr</option>
                  <option value="25000000">Rs. 2.5 Cr</option>
                  <option value="50000000">Rs. 5 Cr</option>
                </select>
              </div>
              <div className="search-field">
                <label>Max Price</label>
                <select value={searchFilters.maxPrice} onChange={e => setSearchFilters({...searchFilters, maxPrice: e.target.value})}>
                  <option value="">No Max</option>
                  <option value="1000000">Rs. 10 L</option>
                  <option value="2500000">Rs. 25 L</option>
                  <option value="5000000">Rs. 50 L</option>
                  <option value="10000000">Rs. 1 Cr</option>
                  <option value="25000000">Rs. 2.5 Cr</option>
                  <option value="50000000">Rs. 5 Cr</option>
                  <option value="100000000">Rs. 10 Cr</option>
                </select>
              </div>
            </form>
            <button className="search-submit" onClick={handleSearch}>Search Property</button>
          </div>
        </div>
      </section>

      {/* Property Types Scroller - White Box */}
      <section className="property-types-section">
        <div className="container">
          <div className="property-types-box">
            <h2 className="section-title">Browse by Property Type</h2>
            <p className="section-subtitle">Explore properties across all categories in Agra</p>
            <div className="property-types-scroller">
              <div className="property-types-track">
                {[...PROPERTY_TYPE_IMAGES, ...PROPERTY_TYPE_IMAGES].map((item, idx) => (
                  <Link to={`/listings?property_type=${encodeURIComponent(item.type)}`} key={idx} className="property-type-card">
                    <div className="property-type-img">
                      <img src={item.img} alt={item.type} loading="lazy" />
                    </div>
                    <div className="property-type-info">
                      <h3>{item.type}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🏠</div>
              <div className="stat-value">500+</div>
              <div className="stat-label">Properties Listed</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😊</div>
              <div className="stat-value">1200+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📍</div>
              <div className="stat-value">50+</div>
              <div className="stat-label">Localities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">10+</div>
              <div className="stat-label">Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">Handpicked premium properties for you</p>
          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : (
            <div className="property-grid">
              {featuredProperties.map(p => (
                <div key={p.id} className="property-card">
                  <div className="property-image">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0].image_path} alt={p.title} loading="lazy" />
                    ) : (
                      <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--grey-200)',color:'var(--grey-400)',fontSize:'48px'}}>🏠</div>
                    )}
                    <span className={`property-badge badge-${p.status}`}>
                      {p.status === 'active' ? 'Active' : p.status === 'pending' ? 'Pending' : p.status === 'rejected' ? 'Rejected' : 'Expired'}
                    </span>
                    <span className={`property-badge ${p.listing_type === 'sale' ? 'badge-sale' : 'badge-rent'}`} style={{ left: 'auto', right: '12px' }}>
                      {p.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                    <div className="property-price">{formatPrice(p.price)}{p.listing_type === 'rent' ? '/month' : ''}</div>
                  </div>
                  <div className="property-body">
                    <h3 className="property-title">{p.title}</h3>
                    <div className="property-location">📍 {p.location}{p.locality ? ', ' + p.locality : ''}</div>
                    <div className="property-features">
                      {p.bedrooms && <span className="property-feature">🛏️ {p.bedrooms} BHK</span>}
                      {p.bathrooms && <span className="property-feature">🚿 {p.bathrooms} Bath</span>}
                      {p.carpet_area && <span className="property-feature">📐 {p.carpet_area} sqft</span>}
                      {p.plot_area && <span className="property-feature">📐 {p.plot_area} sqft</span>}
                    </div>
                  </div>
                  <div className="property-footer">
                    <span className="property-owner">By {p.owner_name || 'Owner'}</span>
                    <span className="property-views">👁️ {p.views || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link to="/listings" className="btn btn-primary btn-lg">View All Properties</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us">
        <div className="container">
          <h2 className="section-title">Why Choose Agra Property Network</h2>
          <p className="section-subtitle">We make property dealing simple, transparent, and trustworthy</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verified Listings</h3>
              <p>Every property is verified for authenticity and legal compliance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Expert Agents</h3>
              <p>Connect with experienced and verified real estate agents</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Get market-competitive prices with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Legal Assistance</h3>
              <p>Complete legal support for documentation and registration</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple 3-step process to find your dream property</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Search</h3>
              <p>Browse through verified listings and filter by your preferences</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Contact</h3>
              <p>Send an enquiry and get in touch with the property owner directly</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Deal</h3>
              <p>Negotiate, finalize, and complete your property deal with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real people</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"Found my dream home in Shastripuram through APN. The process was smooth and transparent. Highly recommended!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div>
                  <strong>Rahul Sharma</strong>
                  <span>Home Buyer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Sold my commercial shop within 2 weeks! The platform gave me great visibility and genuine buyers."</p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div>
                  <strong>Priya Verma</strong>
                  <span>Property Seller</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"As an agent, APN has helped me grow my business. The dashboard and lead management are excellent."</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div>
                  <strong>Amit Singh</strong>
                  <span>Real Estate Agent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Dream Property?</h2>
          <p>Join thousands of happy customers who found their perfect property through APN</p>
          <div className="cta-actions">
            <Link to="/post-property" className="btn btn-primary btn-lg">Post Your Property</Link>
            <Link to="/listings" className="btn btn-outline btn-lg">Browse Properties</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
