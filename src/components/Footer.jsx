import { footer } from '../assets/data/content'
import { useLang } from '../context/LangContext'

const ACCENT = '#8C3D22'

export default function Footer() {
  const { lang } = useLang()
  const f = footer[lang]

  return (
    <footer className="bg-brown pt-12 md:pt-20 pb-8 px-5 md:px-[4.5rem]">
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10 md:mb-14">
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-[24px] font-normal tracking-[4px] uppercase text-paper block mb-4">
            ЛІПИ<em className="not-italic" style={{ color: ACCENT }}>МО</em>
          </span>
          <p className="text-[14px] leading-[1.8] font-light mb-6" style={{ color: 'rgba(253,250,245,0.5)' }}>
            {f.description}
          </p>
          <a href={`tel:${footer.phone}`} className="text-[14px] no-underline" style={{ color: ACCENT }}>
            {footer.phone}
          </a>
        </div>

        {f.columns.map((col) => (
          <div key={col.heading}>
            <h4
              className="text-[12px] tracking-[2px] uppercase font-normal mb-5"
              style={{ color: 'rgba(253,250,245,0.35)' }}
            >
              {col.heading}
            </h4>
            <ul className="list-none flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px] font-light no-underline transition-colors duration-200"
                    style={{ color: 'rgba(253,250,245,0.55)' }}
                    onMouseEnter={(e) => (e.target.style.color = ACCENT)}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(253,250,245,0.55)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-8 text-[13px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(253,250,245,0.3)' }}
      >
        <span>{f.copy}</span>
        <span>{f.privacy}</span>
      </div>
    </footer>
  )
}
