import { hero, ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

export default function Hero() {
  const { lang } = useLang()
  const h = hero[lang]
  const t = ui[lang]

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="pt-[68px] flex flex-col md:grid md:grid-cols-[55%_45%] relative overflow-hidden md:min-h-screen">
      <div className="bg-paper flex flex-col justify-center px-5 py-12 md:px-16 md:py-20 relative z-10">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none hidden md:block" />

        <div className="eyebrow animate-fadeUp">{h.eyebrow}</div>

        <h1
          className="font-serif font-normal leading-[.92] text-brown mb-7 animate-fadeUp"
          style={{ fontSize: 'clamp(56px, 7.5vw, 98px)', animationDelay: '.1s' }}
        >
          {h.title}
          <em className="text-brick not-italic block">{h.titleItalic}</em>
        </h1>

        <p
          className="text-[16px] md:text-[18px] leading-[1.85] text-brown-m font-light max-w-full md:max-w-[420px] mb-9 animate-fadeUp"
          style={{ animationDelay: '.18s' }}
        >
          {h.description}
        </p>

        <div
          className="flex flex-wrap gap-2.5 mb-10 animate-fadeUp"
          style={{ animationDelay: '.26s' }}
        >
          {h.pills.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 bg-cream border border-oat rounded-full px-4 py-2 text-[14px] text-brown-m font-light"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brick flex-shrink-0" />
              {p}
            </span>
          ))}
        </div>

        <div
          className="flex gap-3 animate-fadeUp"
          style={{ animationDelay: '.32s' }}
        >
          <button
            onClick={() => scrollTo('catalog')}
            className="btn-primary hover:-translate-y-0.5"
          >
            {h.ctaPrimary}
          </button>
          <button
            onClick={() => scrollTo('story')}
            className="btn-outline"
          >
            {h.ctaSecondary}
          </button>
        </div>

        <div
          className="hidden md:flex items-center gap-3 mt-14 text-[11px] tracking-[2px] uppercase text-brown-l animate-fadeUp"
          style={{ animationDelay: '.4s' }}
        >
          <div className="w-8 h-px bg-oat relative overflow-hidden scroll-line" />
          {t.scrollDown}
        </div>
      </div>

      <div className="relative overflow-hidden h-[280px] md:h-auto">
        <img
          src={h.image}
          alt="Домашні страви"
          className="w-full h-full object-cover brightness-[.82] saturate-105"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(to right, #F7F2E9 0%, transparent 38%)' }}
        />
      </div>
    </section>
  )
}
