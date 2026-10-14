import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Listings.css'

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

function formatPrice(price) {
  if (!price && price !== 0) return 'Rs. --'
  price = Number(price)
  if (isNaN(price)) return 'Rs. --'
  if (price >= 10000000) return 'Rs. ' + (price / 10000000).toFixed(2) + ' Cr'
  if (price >= 100000) return 'Rs. ' + (price / 100000).toFixed(2) + ' L'
  if (price >= 1000) return 'Rs. ' + (price / 1000).toFixed(1) + ' K'
  return 'Rs. ' + price.toLocaleString('en-IN')
}

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    listing_type: searchParams.get('listing_type') || '',
    property_type: searchParams.get('property_type') || '',
    location: searchParams.get('location') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
  })

  useEffect(() => {
    fetchProperties()
  }, [searchParams])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })
      const res = await fetch('/api/properties?' + params.toString())
      const data = await res.json()
      setProperties(data.properties || [])
    } catch (err) {
      console.error('Failed to fetch properties:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  return (
    <div className="listings-page">
      <div className="container">
        <div className="listings-header">
          <h1>Property Listings</h1>
          <p>Find your perfect property in Agra</p>
        </div>

        <div className="listings-layout">
          <aside className="listings-sidebar">
            <div className="filter-card">
              <h3>Filters</h3>
              <div className="filter-group">
                <label>Listing Type</label>
                <select value={filters.listing_type} onChange={e => handleFilterChange('listing_type', e.target.value)}>
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Property Type</label>
                <select value={filters.property_type} onChange={e => handleFilterChange('property_type', e.target.value)}>
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Location</label>
                <select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)}>
                  <option value="">All Locations</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Min Price</label>
                <select value={filters.min_price} onChange={e => handleFilterChange('min_price', e.target.value)}>
                  <option value="">No Min</option>
                  <option value="500000">Rs. 5 L</option>
                  <option value="1000000">Rs. 10 L</option>
                  <option value="2500000">Rs. 25 L</option>
                  <option value="5000000">Rs. 50 L</option>
                  <option value="10000000">Rs. 1 Cr</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max Price</label>
                <select value={filters.max_price} onChange={e => handleFilterChange('max_price', e.target.value)}>
                  <option value="">No Max</option>
                  <option value="1000000">Rs. 10 L</option>
                  <option value="2500000">Rs. 25 L</option>
                  <option value="5000000">Rs. 50 L</option>
                  <option value="10000000">Rs. 1 Cr</option>
                  <option value="25000000">Rs. 2.5 Cr</option>
                  <option value="50000000">Rs. 5 Cr</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="listings-content">
            <div className="results-header">
              <p>{properties.length} properties found</p>
            </div>
            {loading ? (
              <div className="loading-spinner"><div className="spinner"></div></div>
            ) : properties.length > 0 ? (
              <div className="property-grid">
                {properties.map(p => (
                  <Link to={`/property/${p.id}`} key={p.id} className="property-card">
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
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No properties found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
