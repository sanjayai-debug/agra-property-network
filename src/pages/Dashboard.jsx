import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

function formatPrice(price) {
  if (!price && price !== 0) return 'Rs. --'
  price = Number(price)
  if (isNaN(price)) return 'Rs. --'
  if (price >= 10000000) return 'Rs. ' + (price / 10000000).toFixed(2) + ' Cr'
  if (price >= 100000) return 'Rs. ' + (price / 100000).toFixed(2) + ' L'
  if (price >= 1000) return 'Rs. ' + (price / 1000).toFixed(1) + ' K'
  return 'Rs. ' + price.toLocaleString('en-IN')
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [properties, setProperties] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const token = localStorage.getItem('apn_token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('apn_token')
      const headers = { 'Authorization': 'Bearer ' + token }

      const [userRes, propRes, enqRes] = await Promise.all([
        fetch('/api/auth/me', { headers }),
        fetch('/api/properties?owner_id=me', { headers }),
        fetch('/api/enquiries', { headers })
      ])

      const userData = await userRes.json()
      const propData = await propRes.json()
      const enqData = await enqRes.json()

      setUser(userData.user)
      setProperties(propData.properties || [])
      setEnquiries(enqData.enquiries || [])
    } catch (err) {
      console.error('Failed to fetch user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('apn_token')
    localStorage.removeItem('apn_user')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-spinner"><div className="spinner"></div></div>
      </div>
    )
  }

  if (!user) return null

  const activeProperties = properties.filter(p => p.status === 'active').length
  const pendingProperties = properties.filter(p => p.status === 'pending').length
  const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0)

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">{user.full_name.charAt(0).toUpperCase()}</div>
            <h3>{user.full_name}</h3>
            <p className="text-sm text-grey">{user.user_type}</p>
          </div>
          <nav className="dashboard-nav">
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>📊 Overview</button>
            <button className={activeTab === 'properties' ? 'active' : ''} onClick={() => setActiveTab('properties')}>🏠 My Properties</button>
            <button className={activeTab === 'enquiries' ? 'active' : ''} onClick={() => setActiveTab('enquiries')}>📧 Enquiries</button>
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>⚙️ Profile</button>
            <Link to="/" className="nav-link">← Back to Home</Link>
            <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
          </nav>
        </aside>

        <div className="dashboard-main">
          {activeTab === 'overview' && (
            <div>
              <h1>Dashboard Overview</h1>
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-card-icon blue">🏠</div>
                  <div>
                    <div className="stat-card-value">{properties.length}</div>
                    <div className="stat-card-label">Total Properties</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon green">✓</div>
                  <div>
                    <div className="stat-card-value">{activeProperties}</div>
                    <div className="stat-card-label">Active</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon orange">⏳</div>
                  <div>
                    <div className="stat-card-value">{pendingProperties}</div>
                    <div className="stat-card-label">Pending</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon purple">👁️</div>
                  <div>
                    <div className="stat-card-value">{totalViews}</div>
                    <div className="stat-card-label">Total Views</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon gold">📧</div>
                  <div>
                    <div className="stat-card-value">{enquiries.length}</div>
                    <div className="stat-card-label">Enquiries</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              <div className="tab-header">
                <h1>My Properties</h1>
                <Link to="/post-property" className="btn btn-primary btn-sm">+ Add Property</Link>
              </div>
              {properties.length > 0 ? (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map(p => (
                        <tr key={p.id}>
                          <td>{p.title}</td>
                          <td>{p.property_type}</td>
                          <td>{formatPrice(p.price)}</td>
                          <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                          <td>{p.views || 0}</td>
                          <td className="actions">
                            <Link to={`/property/${p.id}`} className="btn btn-sm btn-ghost">View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No properties yet</h3>
                  <p>Post your first property to get started</p>
                  <Link to="/post-property" className="btn btn-primary">Post Property</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div>
              <h1>Enquiries</h1>
              {enquiries.length > 0 ? (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map(e => (
                        <tr key={e.id}>
                          <td>{e.property_title}</td>
                          <td>{e.name}</td>
                          <td>{e.phone}</td>
                          <td>{e.message}</td>
                          <td>{new Date(e.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No enquiries yet</h3>
                  <p>Enquiries will appear here when someone contacts you</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h1>Profile Settings</h1>
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue={user.full_name} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" defaultValue={user.email} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" defaultValue={user.phone} />
                  </div>
                  <button className="btn btn-primary">Update Profile</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
