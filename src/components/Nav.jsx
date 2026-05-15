import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { ui } from '../assets/data/content'

export default function Nav({ cartCount, onCartOpen, onLogoClick, onCheckout, page, onGoHome }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, toggle } = useLang()
  const t = ui[lang]

  const close = () => setMobileOpen(false)

  const scrollTo = (id) => {
    close()
    if (page === 'home') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      onGoHome()
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }

  const navItems = [
    { label: t.nav[0], action: () => scrollTo('catalog') },
    { label: t.nav[1], action: () => scrollTo('story')   },
    { label: t.nav[2], action: () => { close(); onCheckout() } },
    { label: t.nav[3], action: () => scrollTo('reviews') },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[500] h-[68px] flex items-center justify-between px-5 md:px-10 bg-paper/96 backdrop-blur-md border-b border-oat">
        <a
          href="#"
          onClick={onLogoClick ? (e) => { e.preventDefault(); onLogoClick() } : undefined}
          className="font-serif text-[22px] font-normal tracking-[4px] uppercase text-brown no-underline"
        >
          ЛІПИ<em className="text-brick not-italic">МО</em>
        </a>

        <ul className="hidden md:flex gap-9 list-none">
          {navItems.map(({ label, action }) => (
            <li key={label}>
              <button
                onClick={action}
                className="text-[14px] tracking-[0.5px] text-brown-l bg-transparent border-none cursor-none hover:text-brown transition-colors duration-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <LangToggle lang={lang} toggle={toggle} />
          <span className="hidden lg:block text-[14px] text-brown-l">+380 44 123 45 67</span>
          <button
            onClick={onCartOpen}
            className="bg-brick text-snow border-none px-4 md:px-5 py-2.5 text-[13px] tracking-[1px] cursor-none hover:bg-brick-d transition-colors duration-200 rounded-lg"
          >
            {t.cart}{cartCount > 0 ? ` — ${cartCount}` : ''}
          </button>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] cursor-none bg-transparent border-none p-0"
            aria-label="Меню"
          >
            <span className={`block w-5 h-0.5 bg-brown rounded-full transition-all duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brown rounded-full transition-all duration-200 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brown rounded-full transition-all duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[490] bg-paper pt-[68px] flex flex-col px-6 py-8 md:hidden transition-opacity duration-200 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col list-none">
          {navItems.map(({ label, action }) => (
            <li key={label}>
              <button
                onClick={action}
                className="w-full text-left py-5 font-serif text-[24px] font-normal text-brown border-b border-oat bg-transparent border-x-0 border-t-0 cursor-none"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-4">
          <a href="tel:+380441234567" className="text-[16px] text-brick no-underline font-light">
            +380 44 123 45 67
          </a>
          <LangToggle lang={lang} toggle={toggle} />
        </div>
      </div>
    </>
  )
}

function LangToggle({ lang, toggle }) {
  const isEn = lang === 'en'
  return (
    <button
      onClick={toggle}
      className="relative flex items-center cursor-none rounded-full border border-oat bg-paper/60 backdrop-blur-sm transition-colors duration-200 hover:border-brick/60"
      style={{ width: 84, height: 34, padding: '3px' }}
      aria-label="Switch language"
    >
      {/* Background labels */}
      <span
        className="absolute left-0 w-1/2 text-center text-[11px] tracking-[0.5px] font-medium transition-colors duration-200 select-none z-10"
        style={{ color: !isEn ? 'rgba(251,245,232,0.95)' : 'var(--brown-l)' }}
      >
        УКР
      </span>
      <span
        className="absolute right-0 w-1/2 text-center text-[11px] tracking-[0.5px] font-medium transition-colors duration-200 select-none z-10"
        style={{ color: isEn ? 'rgba(251,245,232,0.95)' : 'var(--brown-l)' }}
      >
        EN
      </span>
      {/* Sliding pill */}
      <span
        className="absolute top-[3px] bottom-[3px] rounded-full transition-all duration-250 flex items-center justify-center z-20"
        style={{
          width: 'calc(50% - 2px)',
          left: isEn ? 'calc(50% + 1px)' : '3px',
          background: 'rgba(140,61,34,0.72)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 1px 6px rgba(140,61,34,0.25)',
        }}
      >
        <span className="text-[11px] tracking-[0.5px] font-medium select-none" style={{ color: 'rgba(251,245,232,0.95)' }}>
          {isEn ? 'EN' : 'УКР'}
        </span>
      </span>
    </button>
  )
}
