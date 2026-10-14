import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PropertyDetail.css'

function formatPrice(price) {
  if (!price && price !== 0) return 'Rs. --'
  price = Number(price)
  if (isNaN(price)) return 'Rs. --'
  if (price >= 10000000) return 'Rs. ' + (price / 10000000).toFixed(2) + ' Cr'
  if (price >= 100000) return 'Rs. ' + (price / 100000).toFixed(2) + ' L'
  if (price >= 1000) return 'Rs. ' + (price / 1000).toFixed(1) + ' K'
  return 'Rs. ' + price.toLocaleString('en-IN')
}

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [enquirySent, setEnquirySent] = useState(false)

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${id}`)
      const data = await res.json()
      setProperty(data.property)
    } catch (err) {
      console.error('Failed to fetch property:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnquiry = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: parseInt(id), ...enquiryForm })
      })
      setEnquirySent(true)
      setEnquiryForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('Failed to send enquiry:', err)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: 'var(--space-12)' }}>
        <div className="loading-spinner"><div className="spinner"></div></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container" style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link to="/listings" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Back to Listings</Link>
      </div>
    )
  }

  const images = property.images || []

  return (
    <div className="property-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/listings">Properties</Link>
          <span>/</span>
          <span>{property.title}</span>
        </nav>

        <div className="property-gallery">
          <div className="gallery-main">
            {images.length > 0 ? (
              <img src={images[activeImage]?.image_path} alt={property.title} />
            ) : (
              <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--grey-200)',color:'var(--grey-400)',fontSize:'64px'}}>🏠</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className={`gallery-thumb ${idx === activeImage ? 'active' : ''}`} onClick={() => setActiveImage(idx)}>
                  <img src={img.image_path} alt={`${property.title} ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            <h1 className="detail-title">{property.title}</h1>
            <div className="detail-location">📍 {property.location}{property.locality ? ', ' + property.locality : ''}</div>
            <div className="detail-price">{formatPrice(property.price)}{property.listing_type === 'rent' ? '/month' : ''}</div>

            <div className="details-grid">
              {property.bedrooms && (
                <div className="detail-item">
                  <div className="detail-item-icon">🛏️</div>
                  <div className="detail-item-value">{property.bedrooms}</div>
                  <div className="detail-item-label">Bedrooms</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="detail-item">
                  <div className="detail-item-icon">🚿</div>
                  <div className="detail-item-value">{property.bathrooms}</div>
                  <div className="detail-item-label">Bathrooms</div>
                </div>
              )}
              {property.carpet_area && (
                <div className="detail-item">
                  <div className="detail-item-icon">📐</div>
                  <div className="detail-item-value">{property.carpet_area}</div>
                  <div className="detail-item-label">Carpet Area (sqft)</div>
                </div>
              )}
              {property.plot_area && (
                <div className="detail-item">
                  <div className="detail-item-icon">📐</div>
                  <div className="detail-item-value">{property.plot_area}</div>
                  <div className="detail-item-label">Plot Area (sqft)</div>
                </div>
              )}
            </div>

            <div className="detail-section">
              <h2>Description</h2>
              <p>{property.description || 'No description available.'}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="detail-section">
                <h2>Amenities</h2>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      <span>✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="owner-card">
              <h3>Contact Owner</h3>
              <div className="owner-info">
                <div className="owner-avatar">
                  {(property.owner_name || 'O').charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{property.owner_name || 'Owner'}</strong>
                  <p className="text-sm text-grey">{property.owner_type || 'Owner'}</p>
                </div>
              </div>

              {enquirySent ? (
                <div className="enquiry-success">
                  <p>✓ Enquiry sent successfully!</p>
                  <button className="btn btn-sm btn-outline" onClick={() => setEnquirySent(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="enquiry-form">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email" value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone" value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} required rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Send Enquiry</button>
                </form>
              )}
            </div>

            <div className="owner-card">
              <h3>Property Details</h3>
              <div className="details-list">
                <div className="detail-row">
                  <span>Type</span>
                  <strong>{property.property_type || 'N/A'}</strong>
                </div>
                <div className="detail-row">
                  <span>Listing</span>
                  <strong>{property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}</strong>
                </div>
                <div className="detail-row">
                  <span>Status</span>
                  <strong className={`badge badge-${property.status}`}>{property.status}</strong>
                </div>
                {property.facing && (
                  <div className="detail-row">
                    <span>Facing</span>
                    <strong>{property.facing}</strong>
                  </div>
                )}
                {property.furnished && (
                  <div className="detail-row">
                    <span>Furnishing</span>
                    <strong>{property.furnished}</strong>
                  </div>
                )}
                {property.floor && (
                  <div className="detail-row">
                    <span>Floor</span>
                    <strong>{property.floor}</strong>
                  </div>
                )}
                {property.total_floors && (
                  <div className="detail-row">
                    <span>Total Floors</span>
                    <strong>{property.total_floors}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
