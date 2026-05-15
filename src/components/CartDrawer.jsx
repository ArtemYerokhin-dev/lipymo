import { useEffect } from 'react'
import { ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

export default function CartDrawer({ open, items, onClose, onRemove, onAdd, onCheckout }) {
  const { lang } = useLang()
  const t = ui[lang]
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-ink/40 z-[700] backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* ── Desktop: right panel ── */}
      <div
        className={`hidden md:flex fixed top-0 right-0 h-full w-[420px] bg-paper z-[750] flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: '-20px 0 60px rgba(16,10,4,0.15)' }}
      >
        <DesktopHeader t={t} count={count} onClose={onClose} />
        <ItemList items={items} lang={lang} onRemove={onRemove} onAdd={onAdd} t={t} />
        <DesktopFooter items={items} total={total} t={t} onCheckout={onCheckout} />
      </div>

      {/* ── Mobile: bottom sheet ── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-paper z-[750] flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -12px 48px rgba(16,10,4,0.18)',
          maxHeight: '82vh',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-9 h-1 rounded-full bg-oat" />
        </div>

        <MobileHeader t={t} count={count} onClose={onClose} />

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6 py-10">
            <p className="text-center text-brown-l text-[14px] leading-[2.2]">
              {t.cartEmpty}<br />{t.cartEmptySub}
            </p>
          </div>
        ) : (
          <>
            {/* Scrollable item list */}
            <ul className="flex-1 overflow-y-auto px-5 pb-2 flex flex-col gap-4" style={{ overscrollBehavior: 'contain' }}>
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 items-center border-b border-oat pb-4">
                  <img src={product.thumb} alt={product.name[lang]} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-brown leading-tight truncate">{product.name[lang]}</div>
                    <div className="text-[12px] text-brown-l mt-0.5">{product.weight[lang]}</div>
                    <div className="text-[13px] text-brick mt-1 font-medium">{product.price * qty} ₴</div>
                  </div>
                  <QtyControl qty={qty} onMinus={() => onRemove(product.id)} onPlus={() => onAdd(product)} />
                </li>
              ))}
            </ul>

            {/* Sticky checkout footer */}
            <div className="px-5 py-4 border-t border-oat flex-shrink-0" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-[12px] tracking-[1.5px] uppercase text-brown-l">{t.cartTotal}</span>
                <span className="font-serif text-[28px] font-normal text-brown leading-none">{total} ₴</span>
              </div>
              <button onClick={onCheckout} className="w-full btn-primary py-4 text-center text-[14px]">
                {t.checkout}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ── Desktop subcomponents ──────────────────────────────────

function DesktopHeader({ t, count, onClose }) {
  return (
    <div className="flex justify-between items-center px-8 py-6 border-b border-oat flex-shrink-0">
      <div>
        <h2 className="font-serif text-[22px] font-normal text-brown">{t.cart}</h2>
        {count > 0 && (
          <span className="text-[13px] text-brown-l font-light">{count} {count === 1 ? 'товар' : 'товари'}</span>
        )}
      </div>
      <button
        onClick={onClose}
        className="w-9 h-9 flex items-center justify-center text-[22px] text-brown-l hover:text-brown cursor-none transition-colors leading-none rounded-xl hover:bg-cream"
      >
        ×
      </button>
    </div>
  )
}

function DesktopFooter({ items, total, t, onCheckout }) {
  if (!items.length) return null
  return (
    <div className="px-8 py-6 border-t border-oat flex-shrink-0">
      <div className="flex justify-between items-baseline mb-5">
        <span className="text-[13px] tracking-[1.5px] uppercase text-brown-l">{t.cartTotal}</span>
        <span className="font-serif text-[30px] font-normal text-brown">{total} ₴</span>
      </div>
      <button onClick={onCheckout} className="w-full btn-primary py-4 text-center">
        {t.checkout}
      </button>
    </div>
  )
}

function MobileHeader({ t, count, onClose }) {
  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-oat flex-shrink-0">
      <h2 className="font-serif text-[20px] font-normal text-brown">
        {t.cart}
        {count > 0 && (
          <span className="ml-2 text-[14px] text-brown-l font-light font-sans">({count})</span>
        )}
      </h2>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center text-[22px] text-brown-l hover:text-brown cursor-none transition-colors leading-none rounded-xl hover:bg-cream"
      >
        ×
      </button>
    </div>
  )
}

// ── Shared ────────────────────────────────────────────────

function ItemList({ items, lang, onRemove, onAdd, t }) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-center text-brown-l text-[14px] leading-[2.2]">
          {t.cartEmpty}<br />{t.cartEmptySub}
        </p>
      </div>
    )
  }
  return (
    <ul className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
      {items.map(({ product, qty }) => (
        <li key={product.id} className="flex gap-4 items-center border-b border-oat pb-5">
          <img src={product.thumb} alt={product.name[lang]} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-medium text-brown truncate">{product.name[lang]}</div>
            <div className="text-[13px] text-brown-l mt-0.5">{product.weight[lang]}</div>
            <div className="text-[14px] text-brick mt-1 font-medium">{product.price * qty} ₴</div>
          </div>
          <QtyControl qty={qty} onMinus={() => onRemove(product.id)} onPlus={() => onAdd(product)} />
        </li>
      ))}
    </ul>
  )
}

function QtyControl({ qty, onMinus, onPlus }) {
  const btn = 'w-7 h-7 border border-oat flex items-center justify-center text-brown-l hover:border-brick hover:text-brick transition-colors cursor-none rounded-lg text-base leading-none'
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button onClick={onMinus} className={btn}>−</button>
      <span className="w-5 text-center text-[14px] text-brown font-medium">{qty}</span>
      <button onClick={onPlus} className={btn}>+</button>
    </div>
  )
}
