# Ember & Bloom - Specialty Coffee E-Commerce

A beautiful, fully-functional specialty coffee e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS.

![Ember & Bloom](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🛍️ Product Catalog
- **6 Premium Coffee Products** with detailed descriptions
- **Product Categories**: Single Origin & Blends
- **Rich Product Details**: Origin, roast level, weight, tasting notes
- **Beautiful Product Images**: AI-generated professional photography for each coffee

### 🔍 Search & Filter
- **Real-time Search**: Search by coffee name, origin, or flavor notes
- **Category Filters**: Filter by Single Origin or Blend
- **Clear Filters**: One-click filter reset
- **Result Count**: Live count of matching products

### 🛒 Shopping Cart
- **Add to Cart**: Quick add from product cards
- **Cart Sidebar**: Slide-in cart with full product details
- **Quantity Controls**: Increase/decrease quantities
- **Remove Items**: Delete items from cart
- **Live Totals**: Real-time subtotal calculation
- **Free Shipping Progress**: Visual indicator for orders over $35

### 💳 Checkout Flow
- **Complete Checkout Form**: Contact, shipping address, payment
- **Order Summary**: Detailed breakdown with items, subtotal, shipping, tax
- **Form Validation**: Required field validation
- **Order Confirmation**: Success screen with order number

### 🎨 Design & UX
- **Warm, Refined Aesthetic**: Coffee-inspired color palette
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Smooth Animations**: Transitions, hover effects, and micro-interactions
- **Toast Notifications**: Feedback for cart actions
- **Keyboard Support**: ESC key to close modals
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MSWDO11/coffee-e-commerce.git

# Navigate to project directory
cd coffee-e-commerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📦 Tech Stack

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.4** - Build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Google Fonts** - Playfair Display & Inter

## 🎯 Project Structure

```
coffee-e-commerce/
├── src/
│   ├── data/
│   │   └── products.ts       # Product data and types
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and animations
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎨 Features Breakdown

### Product Cards
- Hover effects with scale animation
- Roast level badges (Light, Medium, Dark)
- Weight indicators
- Quick add to cart button
- Visual feedback when added (green checkmark)

### Product Details Modal
- Large product image
- Complete product information
- Tasting notes display
- Roast level visualization (5-point scale)
- Add to cart button

### Cart Sidebar
- Slide-in animation
- Product thumbnails
- Quantity controls (+/-)
- Remove item button
- Free shipping progress bar
- Subtotal display
- Checkout button

### Checkout Page
- Multi-section form (Contact, Shipping, Payment)
- Order summary sidebar
- Sticky summary on desktop
- Form validation
- Tax calculation
- Shipping calculation (free over $35)

### Mobile Experience
- Collapsible search bar
- Bottom-sheet modals
- Touch-friendly buttons
- Optimized layouts
- Swipe-friendly cart

## 🌟 Coffee Products

1. **Ethiopian Yirgacheffe** - Light roast, floral & fruity
2. **Colombian Supremo** - Medium roast, balanced & sweet
3. **Midnight Velvet Blend** - Dark roast, rich & bold
4. **Kenyan AA Peaberry** - Medium-light roast, bright & juicy
5. **Morning Ritual Blend** - Medium roast, smooth & approachable
6. **Sumatra Mandheling** - Dark roast, earthy & complex

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: `#3d2314` (Dark Coffee)
- **Secondary**: `#c4956a` (Warm Caramel)
- **Background**: `#faf7f2` (Cream)
- **Text**: `#2c1810` (Espresso)
- **Accent**: `#8b6f47` (Mocha)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ☕ and passion for specialty coffee.

---

**Enjoy your coffee shopping experience!** ☕✨
