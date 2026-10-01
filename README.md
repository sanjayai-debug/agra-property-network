# Agra Property Network

**Agra Mein Property Kharidne aur Bechne Ka Smart Network**

A complete, production-ready real-estate marketplace website for Agra, Uttar Pradesh, India.

---

## Features

### For Visitors
- Browse verified property listings for sale and rent
- Search and filter by location, type, price, bedrooms, furnishing
- View property details with photos, amenities, and location
- Contact property owners via Call, WhatsApp, or Enquiry form
- Save favorite properties (requires registration)

### For Registered Users
- **Free Plan**: List up to 2 active properties
- Post property with photos, amenities, and complete details
- Manage listings (edit, delete, track views and enquiries)
- Receive enquiries from potential buyers/tenants
- Save and manage favorite properties
- Public profile page showing listed properties

### For Admin
- Unlimited property listings
- Approve, reject, edit, or delete any listing
- Mark properties as Featured or Verified
- Manage users (view, suspend, delete)
- Manage categories and locations
- View all enquiries
- Configure site settings
- Dashboard with analytics and statistics

---

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (via node:sqlite)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Frontend**: Vanilla HTML/CSS/JS (no build step required)

---

## Quick Start

### Prerequisites
- Node.js v18 or higher

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open in browser: `http://localhost:3000`

### Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@agrapropertynetwork.com | Admin@123 |
| Agent | agent@agrapropertynetwork.com | Admin@123 |

---

## Project Structure

```
├── server/
│   ├── index.js          # Express server entry point
│   ├── db.js             # SQLite database setup & schema
│   ├── seed.js           # Demo data seeder
│   ├── middleware/
│   │   ├── auth.js       # JWT authentication middleware
│   │   └── upload.js     # Multer file upload middleware
│   └── routes/
│       ├── auth.js       # Login, register, forgot/reset password
│       ├── properties.js # Property CRUD, search, favorites
│       ├── enquiries.js  # Enquiry system
│       ├── admin.js      # Admin panel APIs
│       └── users.js      # User profile APIs
├── public/
│   ├── index.html        # Homepage
│   ├── listings.html     # Search results with filters
│   ├── property.html     # Property detail page
│   ├── post-property.html # Add/edit property form
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── dashboard.html    # User dashboard
│   ├── admin.html        # Admin panel
│   ├── profile.html      # Public user profile
│   ├── promote.html      # Pricing/upgrade page
│   ├── about.html        # About us
│   ├── contact.html      # Contact page
│   ├── privacy-policy.html
│   ├── terms.html
│   ├── disclaimer.html
│   ├── forgot-password.html
│   ├── reset-password.html
│   ├── css/
│   │   ├── style.css     # Main design system
│   │   └── pages.css     # Page-specific styles
│   └── js/
│       ├── app.js        # Shared utilities, header/footer
│       ├── home.js       # Homepage logic
│       ├── listings.js   # Listings page logic
│       ├── property.js   # Property detail logic
│       ├── post-property.js # Post property form logic
│       ├── dashboard.js  # Dashboard logic
│       └── admin.js      # Admin panel logic
├── data/
│   └── agra_property.db  # SQLite database
└── uploads/
    └── properties/       # Uploaded property images
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Search/list properties (with filters)
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/:id` - Get property by ID or slug
- `POST /api/properties` - Create new property (auth required)
- `PUT /api/properties/:id` - Update property (owner/admin)
- `DELETE /api/properties/:id` - Delete property (owner/admin)
- `GET /api/properties/favorites` - Get user's favorites
- `POST /api/properties/:id/favorite` - Toggle favorite

### Enquiries
- `POST /api/enquiries` - Send enquiry
- `GET /api/enquiries` - Get user's enquiries
- `PUT /api/enquiries/:id/status` - Update enquiry status

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/properties` - All properties (with filters)
- `PUT /api/admin/properties/:id/status` - Change property status
- `PUT /api/admin/properties/:id/featured` - Toggle featured
- `PUT /api/admin/properties/:id/verified` - Toggle verified
- `GET /api/admin/users` - All users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/enquiries` - All enquiries
- `GET/POST/PUT/DELETE /api/admin/categories` - Manage categories
- `GET/POST/PUT/DELETE /api/admin/locations` - Manage locations
- `GET/PUT /api/admin/settings` - Manage settings

---

## Business Rules

1. **Admin**: Unlimited property listings
2. **Normal Users**: Maximum 2 active listings (pending + active count)
3. **Listing Limit**: Enforced at API level, not just frontend
4. **Approval**: New listings require admin approval before going live
5. **Sold/Rented**: Properties marked as sold/rented don't appear in active listings

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production
```

---

## Future Enhancements

- Payment gateway integration (Razorpay)
- Cloudinary/S3 image storage
- Google Maps integration
- Mobile OTP authentication
- Email notifications
- Advanced search with AI
- Multi-city support
- Agent CRM system
- Advertisement management

---

## License

Proprietary - All rights reserved.
