import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import products, { categories } from '../data/products.js'
import './Shop.css'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const activeCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        result.sort((a, b) => b.discount - a.discount)
        break
      default:
        break
    }

    return result
  }, [activeCategory, searchQuery, sortBy, priceRange])

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', categoryId)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Shop All Products</h1>
          <p>Discover amazing deals and premium products</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3>Categories</h3>
              <ul className="category-list">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      className={activeCategory === cat.id ? 'active' : ''}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      {cat.name}
                      <span className="count">
                        {cat.id === 'all'
                          ? products.length
                          : products.filter(p => p.category === cat.id).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-filter">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <div className="price-labels">
                  <span>Rs.0</span>
                  <span>Rs.{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>Rating</h3>
              <ul className="rating-filter">
                <li><button>★★★★★ & Up</button></li>
                <li><button>★★★★ & Up</button></li>
                <li><button>★★★ & Up</button></li>
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="shop-content">
            <div className="shop-toolbar">
              <p className="results-count">
                Showing <strong>{filteredProducts.length}</strong> products
                {searchQuery && <span> for "<em>{searchQuery}</em>"</span>}
              </p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
