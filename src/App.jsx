import { useState } from 'react'

import Cursor       from './components/Cursor'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import Catalog      from './components/Catalog'
import ProductModal from './components/ProductModal'
import Story        from './components/Story'
import HowItWorks   from './components/HowItWorks'
import Promo        from './components/Promo'
import Reviews      from './components/Reviews'
import Footer       from './components/Footer'
import CartDrawer   from './components/CartDrawer'
import MiniCart     from './components/MiniCart'
import CatalogPage  from './components/CatalogPage'
import CheckoutPage from './components/CheckoutPage'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen]       = useState(false)
  const [miniCartOpen, setMiniCartOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [page, setPage] = useState('home')

  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find((i) => i.product.id === product.id)
      if (existing) return items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...items, { product, qty: 1 }]
    })
    setMiniCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCartItems((items) => {
      const existing = items.find((i) => i.product.id === productId)
      if (existing && existing.qty > 1) return items.map((i) => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i)
      return items.filter((i) => i.product.id !== productId)
    })
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  const openFullCart = () => { setMiniCartOpen(false); setCartOpen(true) }

  const goHome = () => { setPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }) }
  const goCatalog = () => { setPage('catalog'); window.scrollTo({ top: 0, behavior: 'instant' }) }
  const goCheckout = () => { setCartOpen(false); setMiniCartOpen(false); setPage('checkout'); window.scrollTo({ top: 0, behavior: 'instant' }) }

  return (
    <>
      <Cursor />

      <Nav
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLogoClick={page !== 'home' ? goHome : undefined}
        onCheckout={goCheckout}
        page={page}
        onGoHome={goHome}
      />

      {page === 'checkout' ? (
        <CheckoutPage
          items={cartItems}
          onBack={() => window.history.length > 1 ? (setPage('home'), window.scrollTo({ top: 0, behavior: 'instant' })) : goHome()}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onHome={() => { setCartItems([]); goHome() }}
        />
      ) : page === 'catalog' ? (
        <>
          <CatalogPage onBack={goHome} onOpenModal={setModalProduct} onAddToCart={addToCart} />
          <Footer />
        </>
      ) : (
        <>
          <main>
            <Hero />
            <Catalog onOpenModal={setModalProduct} onAddToCart={addToCart} onSeeAll={goCatalog} />
            <Story />
            <HowItWorks />
            <Promo />
            <Reviews />
          </main>
          <Footer />
        </>
      )}

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />

      <MiniCart
        items={cartItems}
        open={miniCartOpen && !cartOpen && page !== 'checkout'}
        onOpenFull={openFullCart}
        onCheckout={goCheckout}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onAdd={addToCart}
        onCheckout={goCheckout}
      />
    </>
  )
}
