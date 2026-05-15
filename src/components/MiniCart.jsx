import { ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

export default function MiniCart({ items, open, onOpenFull, onCheckout }) {
  const { lang } = useLang()
  const t = ui[lang]

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const last  = items[items.length - 1]

  if (!open || !items.length) return null

  return (
    <>
      {/* ── Mobile: sticky bar at the bottom ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[680] flex items-center gap-3 px-4 py-3 bg-paper border-t border-oat animate-slideUp"
        style={{ boxShadow: '0 -6px 24px rgba(16,10,4,0.10)', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        {/* Thumbnail */}
        {last && (
          <img
            src={last.product.thumb}
            alt=""
            className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
          />
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-brown truncate">
            {last?.product.name[lang]}
          </div>
          <div className="text-[12px] text-brown-l">
            {count} {lang === 'uk' ? (count === 1 ? 'товар' : 'товари') : (count === 1 ? 'item' : 'items')} · {total} ₴
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onOpenFull}
          className="text-[12px] text-brown-l border border-oat rounded-lg px-3 py-2 cursor-none hover:border-brown-l transition-colors flex-shrink-0"
        >
          {lang === 'uk' ? 'Кошик' : 'Cart'}
        </button>
        <button
          onClick={onCheckout}
          className="btn-primary text-[13px] px-4 py-2 flex-shrink-0"
        >
          {lang === 'uk' ? 'Замовити' : 'Order'}
        </button>
      </div>

      {/* ── Desktop: compact card bottom-right ── */}
      <div
        className="hidden md:flex fixed bottom-6 right-6 z-[680] flex-col bg-paper rounded-2xl border border-oat animate-slideUp"
        style={{
          width: 320,
          boxShadow: '0 8px 40px rgba(16,10,4,0.14)',
        }}
      >
        {/* Last added item */}
        {last && (
          <div className="flex gap-3 items-center px-5 pt-5 pb-4 border-b border-oat">
            <img
              src={last.product.thumb}
              alt=""
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] tracking-[1.5px] uppercase text-brown-l mb-0.5">
                {lang === 'uk' ? 'Додано до кошика' : 'Added to cart'}
              </div>
              <div className="text-[15px] font-medium text-brown leading-tight truncate">
                {last.product.name[lang]}
              </div>
              <div className="text-[13px] text-brick font-medium mt-0.5">
                {last.product.price * last.qty} ₴
              </div>
            </div>
          </div>
        )}

        {/* Summary + actions */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-brown-l">
              {count} {lang === 'uk' ? (count === 1 ? 'товар' : 'товари') : (count === 1 ? 'item' : 'items')}
            </span>
            <span className="font-serif text-[22px] font-normal text-brown leading-none">{total} ₴</span>
          </div>

          <button onClick={onCheckout} className="w-full btn-primary py-3 text-[14px] text-center">
            {t.checkout}
          </button>

          <button
            onClick={onOpenFull}
            className="w-full text-[13px] text-brown-l hover:text-brown text-center cursor-none transition-colors"
          >
            {lang === 'uk' ? 'Переглянути кошик →' : 'View cart →'}
          </button>
        </div>
      </div>
    </>
  )
}
