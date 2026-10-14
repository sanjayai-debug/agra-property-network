import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostProperty.css'

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

const AMENITIES = [
  'Parking', 'Lift', 'Security', 'CCTV', 'Park', 'Swimming Pool',
  'Gym', 'Power Backup', 'Water Supply', 'Gated Community', 'Garden',
  'Club House', 'Balcony', 'Road Facing', 'Corner Property'
]

const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
const FURNISHED_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished']
const PARKING_OPTIONS = ['0', '1 Open', '1 Covered', '2 Open', '2 Covered', '3+']

export default function PostProperty() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: '',
    listing_type: 'sale',
    price: '',
    location: '',
    locality: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    carpet_area: '',
    plot_area: '',
    floor: '',
    total_floors: '',
    facing: '',
    furnished: '',
    parking: '',
    amenities: [],
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('apn_token')
      const formDataToSend = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'amenities') {
          formDataToSend.append(key, JSON.stringify(value))
        } else {
          formDataToSend.append(key, value)
        }
      })

      images.forEach(img => {
        formDataToSend.append('images', img)
      })

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formDataToSend
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post property')
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-property-page">
      <div className="container">
        <h1 className="page-title">Post Your Property</h1>
        <p className="page-subtitle">Fill in the details to list your property</p>

        <div className="form-steps">
          <div className={`form-step ${step >= 1 ? 'active' : ''}`}>
            <div className="form-step-number">1</div>
            <span className="form-step-label">Basic Info</span>
          </div>
          <div className={`form-step ${step >= 2 ? 'active' : ''}`}>
            <div className="form-step-number">2</div>
            <span className="form-step-label">Details</span>
          </div>
          <div className={`form-step ${step >= 3 ? 'active' : ''}`}>
            <div className="form-step-number">3</div>
            <span className="form-step-label">Photos</span>
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step-content active">
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input type="text" name="title" className="form-input" placeholder="e.g., 3 BHK Flat in Shastripuram" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-textarea" placeholder="Describe your property..." value={formData.description} onChange={handleChange} rows="4"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Property Type *</label>
                  <select name="property_type" className="form-select" value={formData.property_type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Listing Type *</label>
                  <select name="listing_type" className="form-select" value={formData.listing_type} onChange={handleChange} required>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price (Rs.) *</label>
                  <input type="number" name="price" className="form-input" placeholder="e.g., 5000000" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <select name="location" className="form-select" value={formData.location} onChange={handleChange} required>
                    <option value="">Select Location</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Locality / Area</label>
                <input type="text" name="locality" className="form-input" placeholder="e.g., Shastripuram" value={formData.locality} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Full Address</label>
                <textarea name="address" className="form-textarea" placeholder="Enter complete address" value={formData.address} onChange={handleChange} rows="2"></textarea>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>Next: Details</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step-content active">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <input type="number" name="bedrooms" className="form-input" placeholder="e.g., 3" value={formData.bedrooms} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bathrooms</label>
                  <input type="number" name="bathrooms" className="form-input" placeholder="e.g., 2" value={formData.bathrooms} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Carpet Area (sqft)</label>
                  <input type="number" name="carpet_area" className="form-input" placeholder="e.g., 1200" value={formData.carpet_area} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Plot Area (sqft)</label>
                  <input type="number" name="plot_area" className="form-input" placeholder="e.g., 1500" value={formData.plot_area} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Floor</label>
                  <input type="text" name="floor" className="form-input" placeholder="e.g., 2" value={formData.floor} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Floors</label>
                  <input type="text" name="total_floors" className="form-input" placeholder="e.g., 4" value={formData.total_floors} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Facing</label>
                  <select name="facing" className="form-select" value={formData.facing} onChange={handleChange}>
                    <option value="">Select Facing</option>
                    {FACING_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Furnishing</label>
                  <select name="furnished" className="form-select" value={formData.furnished} onChange={handleChange}>
                    <option value="">Select</option>
                    {FURNISHED_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Parking</label>
                <select name="parking" className="form-select" value={formData.parking} onChange={handleChange}>
                  <option value="">Select</option>
                  {PARKING_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amenities</label>
                <div className="checkbox-group">
                  {AMENITIES.map(amenity => (
                    <label key={amenity} className={`checkbox-item ${formData.amenities.includes(amenity) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => handleAmenityToggle(amenity)} />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>
              <div className="step-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next: Photos</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step-content active">
              <div className="form-group">
                <label className="form-label">Property Photos</label>
                <div className="image-upload-area" onClick={() => document.getElementById('imageInput').click()}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p>Click to upload photos</p>
                  <p className="text-sm text-grey">You can upload multiple images</p>
                </div>
                <input type="file" id="imageInput" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </div>

              {images.length > 0 && (
                <div className="image-preview-grid">
                  {images.map((img, idx) => (
                    <div key={idx} className="image-preview-item">
                      <img src={URL.createObjectURL(img)} alt={`Preview ${idx + 1}`} />
                      <div className="image-preview-actions">
                        <button type="button" onClick={() => removeImage(idx)}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="step-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Property'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
