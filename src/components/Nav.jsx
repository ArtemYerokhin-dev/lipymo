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
          <button
            onClick={toggle}
            className="text-[12px] tracking-[1px] text-brown-l border border-oat rounded-lg px-3 py-1.5 cursor-none hover:border-brick hover:text-brick transition-colors"
          >
            {lang === 'uk' ? 'EN' : 'УКР'}
          </button>
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
          <button
            onClick={toggle}
            className="text-[13px] tracking-[1px] text-brown-l border border-oat rounded-lg px-4 py-2 cursor-none hover:border-brick hover:text-brick transition-colors"
          >
            {lang === 'uk' ? 'EN' : 'УКР'}
          </button>
        </div>
      </div>
    </>
  )
}
