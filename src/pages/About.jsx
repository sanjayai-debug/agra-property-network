import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Agra Property Network</h1>
          <p>Your trusted destination for property in Agra</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              Agra Property Network was founded with a simple mission: to make premium properties accessible to everyone.
              We curate the best residential and commercial properties from trusted builders and sellers,
              bringing them to you at prices that won't break the bank.
            </p>
            <p>
              Whether you're looking for your first home, a commercial space, or an investment opportunity,
              we've got you covered. Our team works tirelessly to ensure every listing meets our quality standards.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop" alt="About Us" />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-content">
            <h2>Why Choose Us?</h2>
            <ul className="about-features">
              <li><strong>Verified Listings:</strong> Every property is verified for authenticity and legal compliance.</li>
              <li><strong>Best Prices:</strong> We negotiate directly with sellers to get you the lowest prices.</li>
              <li><strong>Fast Service:</strong> Get your queries answered within 24 hours.</li>
              <li><strong>Legal Support:</strong> Complete legal assistance for documentation and registration.</li>
              <li><strong>24/7 Support:</strong> Our team is always here to help you with any questions.</li>
            </ul>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop" alt="Why Choose Us" />
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-label">Properties Listed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">1200+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Localities Covered</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years of Trust</span>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Find Your Dream Property?</h2>
          <p>Explore our wide range of properties and find something you'll love</p>
          <Link to="/listings" className="btn btn-primary">Browse Properties</Link>
        </section>
      </div>
    </div>
  )
}
