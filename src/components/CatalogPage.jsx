import { useState } from 'react'
import { products } from '../assets/data/products'

const CATEGORIES = ['Всі', 'Вареники', 'Пельмені', 'Супи', 'Котлети', 'Випічка', 'Страви']

function filterProducts(category) {
  if (category === 'Всі') return products
  if (category === 'Супи') return products.filter(p => p.category === 'Суп')
  return products.filter(p => p.category === category)
}

export default function CatalogPage({ onBack, onOpenModal, onAddToCart }) {
  const [category, setCategory] = useState('Всі')
  const filtered = filterProducts(category)

  return (
    <div className="min-h-screen bg-cream pt-[68px]">

      <div className="bg-paper border-b border-oat px-5 md:px-[4.5rem] py-8 md:py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-brown-l hover:text-brick transition-colors mb-5 cursor-none bg-transparent border-none"
        >
          ← Назад
        </button>
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="eyebrow">Всі страви</div>
            <h1 className="font-serif font-normal text-brown leading-[1.1]" style={{ fontSize: 'clamp(32px, 3.2vw, 48px)' }}>
              Повний каталог
            </h1>
          </div>
          <span className="text-[14px] text-brown-l font-light">{filtered.length} страв</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="cursor-none px-4 py-2 rounded-full text-[13px] transition-all duration-200 border"
              style={{
                background:  category === cat ? 'var(--brick)' : 'transparent',
                color:       category === cat ? '#fff' : 'var(--brown-l)',
                borderColor: category === cat ? 'var(--brick)' : 'var(--oat)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-[4.5rem] py-8 md:py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onInfo={() => onOpenModal(p)}
            onAdd={() => onAddToCart(p)}
          />
        ))}
      </div>

    </div>
  )
}

function ProductCard({ product, onInfo, onAdd }) {
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 700)
  }

  return (
    <div className="food-card group" onClick={onInfo} data-hover>
      <div className="h-[240px] overflow-hidden relative">
        <img
          src={product.thumb}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover brightness-[.88] saturate-110 group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-brick text-snow text-[10px] tracking-[1px] uppercase px-3 py-1.5 rounded-md">
            {product.tag}
          </span>
        )}
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="text-[11px] tracking-[1.5px] uppercase text-brown-l mb-1">{product.category}</div>
        <div className="font-serif text-[20px] font-normal text-brown leading-tight mb-1">{product.name}</div>
        <div className="text-[13px] text-brown-l font-light mb-4">{product.weight}</div>

        <div className="flex justify-between items-center">
          <span className="font-serif text-[24px] font-normal text-brown">{product.price} ₴</span>
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={onInfo}
              className="w-9 h-9 border border-oat text-brown-l text-[13px] flex items-center justify-center cursor-none hover:border-brown-l hover:text-brown transition-all rounded-xl"
            >
              i
            </button>
            <button
              onClick={handleAdd}
              className="w-9 h-9 bg-brick text-snow flex items-center justify-center cursor-none hover:bg-brick-d transition-colors rounded-xl"
            >
              {justAdded
                ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                : <span className="text-lg leading-none">+</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
