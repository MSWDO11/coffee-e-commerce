import { useState, useEffect } from "react";
import { products, categories, Product } from "./data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.notes.some((note) =>
        note.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckout(true);
    setIsCartOpen(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setCart([]);
  };

  const resetAfterOrder = () => {
    setOrderPlaced(false);
    setIsCheckout(false);
  };

  useEffect(() => {
    if (isCartOpen || selectedProduct || isCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen, selectedProduct, isCheckout]);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2c1810]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-sm border-b border-[#e8ddd0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <div>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-[#3d2314] tracking-tight">
                  Ember & Bloom
                </h1>
                <p className="text-[10px] sm:text-xs text-[#8b6f47] tracking-widest uppercase hidden sm:block">
                  Specialty Coffee Roasters
                </p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e0d5c5] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] transition-all placeholder:text-[#b8a089]"
                />
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b8a089]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[#f0e8dc] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#5c3d2e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#f0e8dc] transition-colors"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#5c3d2e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 w-5 h-5 bg-[#c4956a] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e0d5c5] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] transition-all placeholder:text-[#b8a089]"
                  autoFocus
                />
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b8a089]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3d2314] via-[#5c3d2e] to-[#2c1810] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAyIDQgNC0yIDQtNCA0LTQtMi00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[#c4956a] text-sm tracking-widest uppercase mb-3 font-medium">
              Freshly Roasted to Order
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4">
              Discover Coffee<br />
              <span className="text-[#e8c9a0]">Worth Savoring</span>
            </h2>
            <p className="text-[#d4c4b0] text-base sm:text-lg leading-relaxed max-w-lg">
              Hand-selected beans from the world's finest growing regions, roasted in small batches to reveal their unique character.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#3d2314] text-white shadow-md shadow-[#3d2314]/20"
                  : "bg-white text-[#5c3d2e] border border-[#e0d5c5] hover:border-[#c4956a] hover:text-[#3d2314]"
              }`}
            >
              {category}
            </button>
          ))}
          <span className="ml-auto text-sm text-[#8b6f47]">
            {filteredProducts.length} {filteredProducts.length === 1 ? "coffee" : "coffees"}
          </span>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#8b6f47] text-lg">No coffees match your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-[#c4956a] underline hover:text-[#3d2314] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => setSelectedProduct(product)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#3d2314] text-[#d4c4b0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">☕</span>
              <span className="font-serif font-bold text-white">Ember & Bloom</span>
            </div>
            <p className="text-sm text-[#a08b73]">
              © 2026 Ember & Bloom Coffee Roasters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* Checkout Page */}
      {isCheckout && !orderPlaced && (
        <CheckoutPage
          cart={cart}
          cartTotal={cartTotal}
          onBack={() => {
            setIsCheckout(false);
            setIsCartOpen(true);
          }}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {/* Order Confirmation */}
      {orderPlaced && (
        <OrderConfirmation onClose={resetAfterOrder} />
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}: {
  product: Product;
  onViewDetails: () => void;
  onAddToCart: () => void;
}) {
  const roastColor =
    product.roast === "Light"
      ? "bg-[#d4a574]"
      : product.roast === "Medium" || product.roast === "Medium-Light"
      ? "bg-[#8b5e3c]"
      : "bg-[#3d2314]";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#ede5d8] hover:shadow-xl hover:shadow-[#c4956a]/10 transition-all duration-300 hover:-translate-y-1">
      <div
        className="relative aspect-square overflow-hidden cursor-pointer bg-[#f5efe7]"
        onClick={onViewDetails}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`${roastColor} text-white text-xs px-2.5 py-1 rounded-full font-medium`}>
            {product.roast} Roast
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#5c3d2e] text-xs px-2.5 py-1 rounded-full font-medium">
            {product.weight}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs text-[#c4956a] font-medium tracking-wide uppercase mb-1">
          {product.origin}
        </p>
        <h3
          className="font-serif text-lg font-bold text-[#2c1810] mb-2 cursor-pointer hover:text-[#c4956a] transition-colors"
          onClick={onViewDetails}
        >
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="text-xs bg-[#faf3ea] text-[#8b6f47] px-2 py-0.5 rounded-full"
            >
              {note}
            </span>
          ))}
          {product.notes.length > 3 && (
            <span className="text-xs text-[#b8a089]">+{product.notes.length - 3}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#3d2314]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-1.5 bg-[#3d2314] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5c3d2e] transition-colors active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Detail Modal
function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#faf7f2] w-full sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5 text-[#5c3d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="sm:flex">
          <div className="sm:w-1/2 aspect-square bg-[#f5efe7]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:w-1/2 p-6 sm:p-8">
            <p className="text-xs text-[#c4956a] font-medium tracking-wide uppercase mb-1">
              {product.origin} · {product.category}
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[#3d2314]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#8b6f47]">{product.weight}</span>
            </div>

            <p className="text-[#5c3d2e] text-sm leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="mb-5">
              <p className="text-xs font-medium text-[#8b6f47] uppercase tracking-wide mb-2">
                Tasting Notes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-sm bg-[#f0e8dc] text-[#5c3d2e] px-3 py-1 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-medium text-[#8b6f47] uppercase tracking-wide mb-2">
                Roast Level
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const roastLevel =
                      product.roast === "Light" ? 1 :
                      product.roast === "Medium-Light" ? 2 :
                      product.roast === "Medium" ? 3 :
                      product.roast === "Dark" ? 5 : 3;
                    return (
                      <div
                        key={level}
                        className={`w-6 h-2 rounded-full ${
                          level <= roastLevel ? "bg-[#5c3d2e]" : "bg-[#e8ddd0]"
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="text-sm text-[#5c3d2e]">{product.roast}</span>
              </div>
            </div>

            <button
              onClick={onAddToCart}
              className="w-full bg-[#3d2314] text-white py-3 rounded-full font-medium hover:bg-[#5c3d2e] transition-colors active:scale-[0.98]"
            >
              Add to Cart — ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Sidebar
function CartSidebar({
  cart,
  cartTotal,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: {
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#faf7f2] shadow-2xl flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e8ddd0]">
          <h2 className="font-serif text-xl font-bold text-[#2c1810]">Your Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0e8dc] transition-colors"
          >
            <svg className="w-5 h-5 text-[#5c3d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-[#8b6f47]">Your cart is empty</p>
              <p className="text-sm text-[#b8a089] mt-1">Add some delicious coffee!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-white rounded-xl p-3 border border-[#ede5d8]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#2c1810] text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#8b6f47]">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e0d5c5] hover:bg-[#f5efe7] transition-colors text-[#5c3d2e]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#2c1810]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e0d5c5] hover:bg-[#f5efe7] transition-colors text-[#5c3d2e]"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#3d2314]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 text-[#b8a089] hover:text-red-400 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#e8ddd0] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#8b6f47]">Subtotal</span>
              <span className="text-xl font-bold text-[#2c1810]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-[#b8a089]">Shipping calculated at checkout</p>
            <button
              onClick={onCheckout}
              className="w-full bg-[#3d2314] text-white py-3.5 rounded-full font-medium hover:bg-[#5c3d2e] transition-colors active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Checkout Page
function CheckoutPage({
  cart,
  cartTotal,
  onBack,
  onPlaceOrder,
}: {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onPlaceOrder: (e: React.FormEvent) => void;
}) {
  const shipping = cartTotal > 35 ? 0 : 5.99;
  const total = cartTotal + shipping;

  return (
    <div className="fixed inset-0 z-50 bg-[#faf7f2] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#5c3d2e] hover:text-[#3d2314] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c1810] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={onPlaceOrder} className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 border border-[#ede5d8]">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] mb-4">Contact</h3>
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
              />
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 border border-[#ede5d8]">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
                <input
                  type="text"
                  required
                  placeholder="Last name"
                  className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
                <input
                  type="text"
                  required
                  placeholder="Address"
                  className="sm:col-span-2 px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
                <input
                  type="text"
                  required
                  placeholder="City"
                  className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
                <input
                  type="text"
                  required
                  placeholder="ZIP code"
                  className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-[#ede5d8]">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] mb-4">Payment</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Card number"
                  className="w-full px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="CVC"
                    className="px-4 py-3 border border-[#e0d5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40 focus:border-[#c4956a] placeholder:text-[#b8a089]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3d2314] text-white py-4 rounded-full font-medium text-lg hover:bg-[#5c3d2e] transition-colors active:scale-[0.98]"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-[#ede5d8] sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#2c1810] mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#c4956a] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2c1810] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#8b6f47]">{item.product.weight}</p>
                    </div>
                    <span className="text-sm font-medium text-[#3d2314]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#ede5d8] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b6f47]">Subtotal</span>
                  <span className="text-[#2c1810]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b6f47]">Shipping</span>
                  <span className="text-[#2c1810]">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#c4956a]">
                    Add ${(35 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#ede5d8]">
                  <span className="text-[#2c1810]">Total</span>
                  <span className="text-[#3d2314]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Confirmation
function OrderConfirmation({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#faf7f2] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#2c1810] mb-3">
          Order Confirmed!
        </h2>
        <p className="text-[#5c3d2e] mb-2">
          Thank you for your order. Your coffee is being prepared with care.
        </p>
        <p className="text-sm text-[#8b6f47] mb-8">
          Order #EB-{Math.floor(Math.random() * 90000 + 10000)} · Estimated delivery in 3-5 business days
        </p>
        <button
          onClick={onClose}
          className="bg-[#3d2314] text-white px-8 py-3 rounded-full font-medium hover:bg-[#5c3d2e] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default App;
