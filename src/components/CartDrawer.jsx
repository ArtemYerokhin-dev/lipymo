import { useEffect } from 'react'

export default function CartDrawer({ open, items, onClose, onRemove, onAdd, onCheckout }) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

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
      <div
        className={`fixed inset-0 bg-ink/50 z-[700] backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-paper z-[750] flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: '-16px 0 48px rgba(16,10,4,0.18)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-oat">
          <h2 className="font-serif text-[22px] font-normal text-brown">Кошик</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[22px] text-brown-l hover:text-brown cursor-none transition-colors leading-none rounded-lg hover:bg-cream"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <p className="text-center text-brown-l text-[14px] mt-24 leading-[2.2]">
              Кошик порожній.<br />Оберіть страву з меню.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 items-center border-b border-oat pb-5">
                  <img src={product.thumb} alt={product.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-brown truncate">{product.name}</div>
                    <div className="text-[13px] text-brown-l mt-0.5">{product.weight}</div>
                    <div className="text-[14px] text-brick mt-1 font-medium">{product.price * qty} ₴</div>
                  </div>
                  <QtyControl
                    qty={qty}
                    onMinus={() => onRemove(product.id)}
                    onPlus={() => onAdd(product)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-oat">
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-[13px] tracking-[1.5px] uppercase text-brown-l">Разом</span>
              <span className="font-serif text-[30px] font-normal text-brown">{total} ₴</span>
            </div>
            <button onClick={onCheckout} className="w-full btn-primary py-4 text-center">
              Оформити замовлення
            </button>
          </div>
        )}
      </div>
    </>
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
