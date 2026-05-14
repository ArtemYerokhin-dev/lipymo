import { promo } from '../assets/data/content'

export default function Promo() {
  return (
    <section className="bg-cream py-12 md:py-16 px-5 md:px-[4.5rem]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-14 items-center">

        <div>
          <div className="eyebrow">{promo.eyebrow}</div>
          <h2 className="sec-title mb-5">
            {promo.title}{' '}
            <em className="text-brick" style={{ fontStyle: 'italic' }}>{promo.titleItalic}</em>
          </h2>
          <p className="text-[15px] text-brown-m font-light leading-[1.9] mb-10 max-w-[380px]">
            {promo.description}
          </p>

          <div className="flex items-stretch gap-0 w-fit">
            <div className="border border-oat bg-paper rounded-l-xl px-7 py-4 flex flex-col justify-center">
              <div className="text-[11px] tracking-[2px] uppercase text-brown-l mb-1">Промокод</div>
              <div className="font-serif text-[22px] font-normal text-brown tracking-[2px]">{promo.code}</div>
            </div>
            <div
              className="rounded-r-xl px-8 py-4 flex flex-col justify-center"
              style={{ background: '#8C3D22' }}
            >
              <div className="text-[11px] tracking-[2px] uppercase mb-1" style={{ color: 'rgba(251,245,232,0.6)' }}>Знижка</div>
              <div className="font-serif font-normal leading-none" style={{ fontSize: 36, color: '#FBF5E8' }}>
                {promo.discount}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={promo.image}
            alt=""
            className="w-full h-[240px] md:h-[380px] object-cover rounded-2xl brightness-95 saturate-105"
          />
          <div
            className="absolute top-5 right-5 bg-paper/90 backdrop-blur-sm rounded-xl px-5 py-3.5 text-right"
            style={{ boxShadow: '0 4px 20px rgba(30,17,8,0.12)' }}
          >
            <div className="font-serif text-[12px] text-brown-l italic mb-0.5">гарантія якості</div>
            <div className="font-serif text-[16px] font-normal text-brown leading-tight">Повернемо гроші,<br />якщо не сподобається</div>
          </div>
        </div>

      </div>
    </section>
  )
}
