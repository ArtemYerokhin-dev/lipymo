import { useState, useRef, useCallback, useEffect } from 'react'
import { reviews as defaultReviews, ratingInfo } from '../assets/data/reviews'
import { reviewsSection } from '../assets/data/content'

const STORAGE_KEY = 'lepimo_reviews'
const GAP = 20
const PER_PAGE = 3

function usePerPage() {
  const [n, setN] = useState(() => window.innerWidth < 768 ? 1 : 3)
  useEffect(() => {
    const fn = () => setN(window.innerWidth < 768 ? 1 : 3)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return n
}

function loadUserReviews() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function Carousel({ reviews }) {
  const [idx, setIdx] = useState(0)
  const trackRef = useRef(null)
  const perPage = usePerPage()
  const maxIdx = Math.max(0, reviews.length - perPage)

  const scrollTo = useCallback((newIdx) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = (el.clientWidth - GAP * (perPage - 1)) / perPage
    el.scrollTo({ left: newIdx * (cardWidth + GAP), behavior: 'smooth' })
    setIdx(newIdx)
  }, [perPage])

  useEffect(() => { setIdx(0); scrollTo(0) }, [reviews.length, perPage])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = (el.clientWidth - GAP * (perPage - 1)) / perPage
      const newIdx = Math.round(el.scrollLeft / (cardWidth + GAP))
      setIdx(Math.min(newIdx, maxIdx))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [perPage, maxIdx])

  return (
    <div className="relative">
      <button
        onClick={() => scrollTo(Math.max(0, idx - 1))}
        disabled={idx === 0}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-cream border border-oat items-center justify-center cursor-none hover:bg-brick hover:border-brick group transition-all duration-200 disabled:opacity-25 disabled:pointer-events-none"
        style={{ boxShadow: '0 2px 10px rgba(30,17,8,0.10)' }}
      >
        <svg className="w-4 h-4 text-brown-m group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={() => scrollTo(Math.min(maxIdx, idx + 1))}
        disabled={idx >= maxIdx}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-cream border border-oat items-center justify-center cursor-none hover:bg-brick hover:border-brick group transition-all duration-200 disabled:opacity-25 disabled:pointer-events-none"
        style={{ boxShadow: '0 2px 10px rgba(30,17,8,0.10)' }}
      >
        <svg className="w-4 h-4 text-brown-m group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="flex overflow-x-scroll"
        style={{ scrollbarWidth: 'none', gap: GAP, scrollSnapType: 'x mandatory' }}
      >
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              flex: `0 0 calc((100% - ${GAP * (perPage - 1)}px) / ${perPage})`,
              scrollSnapAlign: 'start',
            }}
          >
            <ReviewCard review={r} />
          </div>
        ))}
      </div>

      {maxIdx > 0 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="cursor-none transition-all duration-200 rounded-full"
              style={{
                width: i === idx ? 20 : 8,
                height: 8,
                background: i === idx ? '#8C3D22' : '#D5C5A8',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Reviews() {
  const [userReviews, setUserReviews] = useState(loadUserReviews)
  const [form, setForm]               = useState({ name: '', dish: '', text: '', stars: 0 })
  const [hoverStar, setHoverStar]     = useState(0)
  const [submitted, setSubmitted]     = useState(false)
  const [errors, setErrors]           = useState({})

  const allReviews = [...defaultReviews, ...userReviews]
  const showCarousel = allReviews.length > PER_PAGE

  const handleSubmit = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.text.trim()) e.text = true
    if (!form.stars)       e.stars = true
    setErrors(e)
    if (Object.keys(e).length) return

    const review = {
      id:    Date.now(),
      name:  form.name.trim(),
      city:  form.dish.trim(),
      stars: form.stars,
      text:  `«${form.text.trim()}»`,
    }
    const updated = [...userReviews, review]
    setUserReviews(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSubmitted(true)
    setForm({ name: '', dish: '', text: '', stars: 0 })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="reviews" className="bg-paper py-12 md:py-16 px-5 md:px-[4.5rem] border-t border-oat/60">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
        <div>
          <div className="eyebrow">{reviewsSection.eyebrow}</div>
          <h2 className="sec-title">{reviewsSection.title}</h2>
        </div>
        <div className="text-right">
          <div className="font-serif font-normal leading-none" style={{ fontSize: 46, color: '#8C3D22' }}>
            {ratingInfo.average}
          </div>
          <div className="text-[15px] tracking-[4px] mt-1" style={{ color: '#8C3D22' }}>★★★★★</div>
          <div className="text-[12px] tracking-wider mt-1 text-brown-l">
            {ratingInfo.total + userReviews.length} відгуки
          </div>
        </div>
      </div>

      <div className="mb-8">
        {showCarousel ? (
          <Carousel reviews={allReviews} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-cream rounded-2xl p-5 md:p-8" style={{ boxShadow: '0 2px 14px rgba(30,17,8,0.05)' }}>
        <h3 className="font-serif text-[22px] font-normal text-brown mb-6">
          {reviewsSection.formTitle}
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-[13px] tracking-wider text-brown-l uppercase">Оцінка:</span>
          <div className="flex gap-2 flex-row-reverse justify-end">
            {[5, 4, 3, 2, 1].map((s) => (
              <label
                key={s}
                className="text-[26px] cursor-none leading-none transition-colors duration-150"
                style={{ color: (hoverStar >= s || form.stars >= s) ? '#8C3D22' : '#D5C5A8' }}
                onMouseEnter={() => setHoverStar(s)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => setForm(f => ({ ...f, stars: s }))}
              >
                ★
              </label>
            ))}
          </div>
          {errors.stars && <span className="text-[12px] text-brick ml-2">Оберіть оцінку</span>}
        </div>

        <div className="flex flex-col gap-3 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] tracking-[1.5px] uppercase text-brown-l">Ваше ім'я</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Як вас звати?"
                className={`bg-paper border px-4 py-3 text-[15px] text-brown font-light outline-none rounded-xl transition-colors duration-200 cursor-text ${errors.name ? 'border-brick' : 'border-oat focus:border-brown-l'}`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] tracking-[1.5px] uppercase text-brown-l">Страва (необов'язково)</label>
              <input
                type="text"
                value={form.dish}
                onChange={(e) => setForm(f => ({ ...f, dish: e.target.value }))}
                placeholder="Що замовляли?"
                className="bg-paper border border-oat focus:border-brown-l px-4 py-3 text-[15px] text-brown font-light outline-none rounded-xl transition-colors duration-200 cursor-text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] tracking-[1.5px] uppercase text-brown-l">Відгук</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="Розкажіть, як вам наша їжа..."
              rows={3}
              className={`bg-paper border px-4 py-3 text-[15px] text-brown font-light outline-none rounded-xl resize-none transition-colors duration-200 cursor-text ${errors.text ? 'border-brick' : 'border-oat focus:border-brown-l'}`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3">
          <span className="text-[14px] text-brown-l font-light">{reviewsSection.formNote}</span>
          <button onClick={handleSubmit} className="btn-primary">Надіслати відгук</button>
        </div>

        {submitted && (
          <div className="mt-4 text-[14px] text-brick">{reviewsSection.formSuccess}</div>
        )}
      </div>

    </section>
  )
}

function ReviewCard({ review: r }) {
  return (
    <div className="bg-cream rounded-2xl p-7 h-full" style={{ boxShadow: '0 2px 14px rgba(30,17,8,0.05)' }}>
      <div className="text-[14px] tracking-[3px] mb-4" style={{ color: '#8C3D22' }}>
        {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
      </div>
      <p className="font-serif text-[17px] font-normal italic text-brown leading-[1.7] mb-6">
        {r.text}
      </p>
      <div className="text-[13px] text-brown-l mt-auto">
        <strong className="block text-[14px] font-medium text-brown-m mb-0.5">{r.name}</strong>
        {r.city}
      </div>
    </div>
  )
}
