import { useRef, useState } from 'react'
import { products } from '../assets/data/products'
import { catalog, ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

const SCROLL_STEP = 800
const CATEGORY_KEYS = ['all', 'Вареники', 'Пельмені', 'Суп', 'Котлети', 'Випічка', 'Страви']

function filterProducts(key) {
  if (key === 'all') return products
  return products.filter(p => p.category === key)
}

export default function Catalog({ onOpenModal, onAddToCart, onSeeAll }) {
  const { lang } = useLang()
  const t = ui[lang]
  const c = catalog[lang]

  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [category, setCategory] = useState('all')

  const scroll = (dir) => trackRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' })

  const onDragStart = (e) => {
    drag.current = { active: true, startX: e.pageX - trackRef.current.offsetLeft, scrollLeft: trackRef.current.scrollLeft }
  }
  const onDragMove = (e) => {
    if (!drag.current.active) return
    e.preventDefault()
    trackRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - trackRef.current.offsetLeft - drag.current.startX) * 1.4
  }
  const onDragEnd = () => { drag.current.active = false }

  return (
    <section id="catalog" className="bg-cream py-12 md:py-20">

      <div className="flex justify-between items-end px-5 md:px-[4.5rem] mb-8">
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="sec-title">{c.title}</h2>
        </div>
        <button
          onClick={onSeeAll}
          className="text-[14px] text-brown-l flex items-center gap-2 hover:text-brick hover:gap-3 transition-all duration-200 cursor-none bg-transparent border-none"
        >
          {c.seeAllLabel} →
        </button>
      </div>

      <div className="flex gap-2 px-5 md:px-[4.5rem] mb-8 flex-wrap">
        {CATEGORY_KEYS.map(key => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className="cursor-none px-5 py-2 rounded-full text-[13px] transition-all duration-200 border"
            style={{
              background:   category === key ? 'var(--brick)' : 'var(--paper)',
              color:        category === key ? '#fff' : 'var(--brown-l)',
              borderColor:  category === key ? 'var(--brick)' : 'var(--oat)',
            }}
          >
            {t.categories[key]}
          </button>
        ))}
      </div>

      <div className="relative">
        <ScrollBtn onClick={() => scroll(-1)} icon="prev" side="left"  className="hidden md:flex" />
        <ScrollBtn onClick={() => scroll(1)}  icon="next" side="right" className="hidden md:flex" />

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 overflow-x-auto px-5 md:px-[4.5rem] pb-6 select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {filterProducts(category).map(p => (
            <ProductCard
              key={p.id}
              product={p}
              lang={lang}
              t={t}
              onInfo={() => onOpenModal(p)}
              onAdd={() => onAddToCart(p)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onSeeAll}
          className="btn-primary px-10 py-4 text-[15px]"
        >
          {c.orderNow}
        </button>
      </div>

    </section>
  )
}

function ScrollBtn({ onClick, icon, side, className = '' }) {
  const pos = side === 'left'
    ? 'left-[52px] -translate-x-1/2'
    : 'right-[52px] translate-x-1/2'
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${pos} z-10 w-12 h-12 rounded-full border border-oat bg-paper shadow-md items-center justify-center cursor-none hover:bg-brick hover:border-brick group transition-all duration-200 ${className}`}
    >
      <svg className="w-5 h-5 text-brown-m group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

function ProductCard({ product, lang, t, onInfo, onAdd }) {
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 700)
  }

  return (
    <div className="food-card flex-shrink-0 w-[340px] group" onClick={onInfo} data-hover>
      <div className="h-[300px] overflow-hidden relative">
        <img
          src={product.thumb}
          alt={product.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover brightness-[.88] saturate-110 group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag[lang] && (
          <span className="absolute top-4 left-4 bg-brick text-snow text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-md">
            {product.tag[lang]}
          </span>
        )}
      </div>

      <div className="px-6 pt-5 pb-6">
        <div className="text-[11px] tracking-[2px] uppercase text-brown-l mb-1.5">{product.categoryLabel[lang]}</div>
        <div className="font-serif text-[23px] font-normal text-brown leading-tight mb-1">{product.name[lang]}</div>
        <div className="text-[13px] text-brown-l font-light mb-5">{product.weight[lang]}</div>

        <div className="flex justify-between items-center">
          <span className="font-serif text-[30px] font-normal text-brown leading-none">{product.price} ₴</span>
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={onInfo}
              className="w-10 h-10 border border-oat text-brown-l text-[14px] flex items-center justify-center cursor-none hover:border-brown-l hover:text-brown transition-all duration-200 rounded-xl"
            >
              i
            </button>
            <button
              onClick={handleAdd}
              className="w-10 h-10 bg-brick text-snow flex items-center justify-center cursor-none hover:bg-brick-d transition-colors duration-200 rounded-xl"
            >
              {justAdded
                ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                : <span className="text-xl leading-none">+</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
