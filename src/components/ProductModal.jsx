import { useEffect } from 'react'
import { ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

export default function ProductModal({ product, onClose, onAdd }) {
  const { lang } = useLang()
  const t = ui[lang]

  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 bg-ink/70 z-[800] flex items-center justify-center backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-paper max-w-[700px] w-[96%] md:w-[92%] flex flex-col md:grid md:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl max-h-[90vh] md:max-h-none">
        <div className="relative h-[220px] md:h-auto md:min-h-[380px] flex-shrink-0">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover brightness-[.88]"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-ink/40 border-none text-snow text-xl flex items-center justify-center cursor-none rounded-full z-10 leading-none hover:bg-ink/65 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="text-[12px] tracking-[1.5px] uppercase text-brick mb-2">
            {product.categoryLabel[lang]}
          </div>
          <h3 className="font-serif text-[28px] font-normal text-brown leading-tight mb-1">
            {product.name[lang]}
          </h3>
          <div className="text-[14px] text-brown-l mb-6">{product.weight[lang]}</div>

          <div className="text-[12px] tracking-[1.5px] uppercase text-brown-l mb-3">{t.ingredients}</div>
          <ul className="list-none mb-auto">
            {product.ingredients[lang].map((ing, i) => (
              <li
                key={i}
                className="text-[15px] text-brown-m font-light py-2 border-b border-oat flex items-center gap-2.5"
              >
                <span className="w-1 h-1 rounded-full bg-brick flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center pt-6 mt-5 border-t border-oat">
            <span className="font-serif text-[32px] font-normal text-brown">{product.price} ₴</span>
            <button
              onClick={() => { onAdd(product); onClose() }}
              className="btn-primary"
            >
              {t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
