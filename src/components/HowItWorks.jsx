import { howItWorks } from '../assets/data/content'
import { useLang } from '../context/LangContext'

export default function HowItWorks() {
  const { lang } = useLang()
  const h = howItWorks[lang]

  return (
    <section id="how" className="bg-paper py-12 md:py-16 px-5 md:px-[4.5rem]">

      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="eyebrow">{h.eyebrow}</div>
          <h2 className="sec-title">{h.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {h.steps.map((step) => (
          <div
            key={step.num}
            className="bg-cream rounded-2xl px-8 py-7 flex gap-5 items-start"
          >
            <div className="font-serif font-normal text-oat flex-shrink-0 leading-none" style={{ fontSize: 44 }}>
              {step.num}
            </div>
            <div>
              <div className="font-serif text-[20px] font-normal text-brown mb-2">{step.title}</div>
              <p className="text-[14px] text-brown-l font-light leading-[1.75]">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
