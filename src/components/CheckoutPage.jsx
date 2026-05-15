import { useState } from 'react'
import { ui } from '../assets/data/content'
import { useLang } from '../context/LangContext'

// ─── Small reusable pieces ────────────────────────────────

function Field({ label, error, errorMsg, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[2px] uppercase text-brown-l">{label}</label>
      {children}
      {error && <span className="text-[12px] text-brick">{errorMsg}</span>}
    </div>
  )
}

function Input({ error, className = '', ...props }) {
  const base = 'bg-paper border px-4 py-3 text-[15px] text-brown font-light outline-none rounded-xl transition-colors duration-200 cursor-text w-full'
  const border = error ? 'border-brick' : 'border-oat focus:border-brown-l'
  return <input className={`${base} ${border} ${className}`} {...props} />
}

function Textarea({ error, ...props }) {
  const base = 'bg-paper border px-4 py-3 text-[15px] text-brown font-light outline-none rounded-xl resize-none transition-colors duration-200 cursor-text w-full'
  const border = error ? 'border-brick' : 'border-oat focus:border-brown-l'
  return <textarea className={`${base} ${border}`} {...props} />
}

function PaymentOption({ id, label, sub, icon, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
      className="text-left p-5 rounded-xl border transition-all duration-200 cursor-none"
      style={{
        borderColor: selected ? 'var(--brick)' : 'var(--oat)',
        background:  selected ? 'rgba(140,61,34,0.05)' : 'transparent',
      }}
    >
      <div className="flex items-center gap-3 mb-2" style={{ color: selected ? 'var(--brick)' : 'var(--brown-l)' }}>
        {icon}
        <span className="font-serif text-[17px] font-normal text-brown">{label}</span>
        <div
          className="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: selected ? 'var(--brick)' : 'var(--oat)' }}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-brick" />}
        </div>
      </div>
      <div className="text-[12px] text-brown-l font-light">{sub}</div>
    </button>
  )
}

// ─── Success screen ───────────────────────────────────────

function SuccessScreen({ onHome, t }) {
  return (
    <div className="min-h-screen bg-cream pt-[68px] flex items-center justify-center">
      <div className="text-center max-w-[480px] px-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'rgba(140,61,34,0.1)', border: '2px solid rgba(140,61,34,0.3)' }}>
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="var(--brick)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-[36px] font-normal text-brown leading-tight mb-4">
          {t.successTitle}<br /><em className="text-brick" style={{ fontStyle: 'italic' }}>{t.successItalic}</em>
        </h2>
        <p className="text-[15px] text-brown-m font-light leading-[1.9] mb-8">
          {t.successText}
        </p>
        <button onClick={onHome} className="btn-primary">{t.successBtn}</button>
      </div>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────

function formatCardNumber(v) { return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }
function formatExpiry(v)     { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d }

// ─── Main page ────────────────────────────────────────────

const PROMO_CODES = { 'ЛІПИМО': 20, 'LIPYMO': 20 }

export default function CheckoutPage({ items, onBack, onAdd, onRemove, onHome }) {
  const { lang } = useLang()
  const t = ui[lang]

  const [form, setForm]       = useState({ name: '', phone: '', city: lang === 'uk' ? 'Київ' : 'Kyiv', street: '', building: '', apt: '', note: '' })
  const [payment, setPayment] = useState('cash')
  const [card, setCard]       = useState({ number: '', holder: '', expiry: '', cvv: '' })
  const [errors, setErrors]   = useState({})
  const [done, setDone]       = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo]           = useState(null)
  const [promoError, setPromoError] = useState(false)

  const paymentOptions = [
    {
      id: 'cash',
      label: t.payCash,
      sub: t.payCashSub,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
    },
    {
      id: 'card',
      label: t.payCard,
      sub: t.payCardSub,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
    {
      id: 'apple',
      label: t.payApple,
      sub: t.payAppleSub,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
    },
  ]

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setPromo({ code, discount: PROMO_CODES[code] })
      setPromoError(false)
    } else {
      setPromo(null)
      setPromoError(true)
    }
  }

  const subtotal  = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const discount  = promo ? Math.round(subtotal * promo.discount / 100) : 0
  const total     = subtotal - discount
  const count     = items.reduce((sum, i) => sum + i.qty, 0)

  const setF        = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const setFDigits  = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value.replace(/\D/g, '') }))
  const setC = (key) => (e) => {
    const raw = e.target.value
    const val = key === 'number' ? formatCardNumber(raw) : key === 'expiry' ? formatExpiry(raw) : key === 'cvv' ? raw.replace(/\D/g, '').slice(0, 3) : raw
    setCard(c => ({ ...c, [key]: val }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = true
    if (!form.phone.trim())    e.phone    = true
    if (!form.street.trim())   e.street   = true
    if (!form.building.trim()) e.building = true
    if (payment === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) e.cn = true
      if (!card.holder.trim())                        e.ch = true
      if (card.expiry.replace(/\s\/\s/, '').length < 4) e.ce = true
      if (card.cvv.length < 3)                        e.cv = true
    }
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    setErrors(e)
    if (!Object.keys(e).length) setDone(true)
  }

  if (done)          return <SuccessScreen onHome={onHome} t={t} />
  if (!items.length) return (
    <div className="min-h-screen bg-cream pt-[68px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[16px] text-brown-m font-light mb-6">{t.emptyCartMsg}</p>
        <button onClick={onBack} className="btn-primary">{t.emptyCartBtn}</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream pt-[68px]">

      <div className="bg-paper border-b border-oat px-5 md:px-[4.5rem] py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-brown-l hover:text-brick transition-colors mb-4 cursor-none bg-transparent border-none">
          {t.back}
        </button>
        <div className="eyebrow">{t.checkoutEyebrow}</div>
        <h1 className="font-serif font-normal text-brown leading-[1.1]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{t.checkoutTitle}</h1>
      </div>

      <div className="px-5 md:px-[4.5rem] py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 md:gap-10 items-start">

        {/* ── Left: delivery + payment ── */}
        <div className="flex flex-col gap-7">

          <div className="info-card p-5 md:p-8">
            <h3 className="font-serif text-[22px] font-normal text-brown mb-6">{t.deliveryTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t.fieldName} error={errors.name} errorMsg={t.fieldRequired}>
                <Input value={form.name} onChange={setF('name')} placeholder={t.namePlaceholder} error={errors.name} />
              </Field>
              <Field label={t.fieldPhone} error={errors.phone} errorMsg={t.fieldRequired}>
                <Input value={form.phone} onChange={setF('phone')} placeholder={t.phonePlaceholder} type="tel" inputMode="tel" error={errors.phone} />
              </Field>
              <Field label={t.fieldCity}>
                <Input value={form.city} onChange={setF('city')} />
              </Field>
              <Field label={t.fieldStreet} error={errors.street} errorMsg={t.fieldRequired}>
                <Input value={form.street} onChange={setF('street')} placeholder={t.streetPlaceholder} error={errors.street} />
              </Field>
              <Field label={t.fieldBuilding} error={errors.building} errorMsg={t.fieldRequired}>
                <Input value={form.building} onChange={setFDigits('building')} placeholder={t.buildingPlaceholder} inputMode="numeric" error={errors.building} />
              </Field>
              <Field label={t.fieldApt}>
                <Input value={form.apt} onChange={setFDigits('apt')} placeholder={t.aptPlaceholder} inputMode="numeric" />
              </Field>
              <div className="col-span-full">
                <Field label={t.fieldNote}>
                  <Textarea value={form.note} onChange={setF('note')} placeholder={t.notePlaceholder} rows={2} />
                </Field>
              </div>
            </div>
          </div>

          <div className="info-card p-5 md:p-8">
            <h3 className="font-serif text-[22px] font-normal text-brown mb-6">{t.paymentTitle}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {paymentOptions.map(opt => (
                <PaymentOption key={opt.id} {...opt} selected={payment === opt.id} onSelect={setPayment} />
              ))}
            </div>

            {payment === 'apple' && (
              <div className="border border-oat rounded-xl p-6 bg-cream flex gap-4">
                <svg className="w-8 h-8 flex-shrink-0 mt-0.5 text-brown-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div>
                  <div className="text-[14px] font-medium text-brown mb-1">{t.appleInfoTitle}</div>
                  <p className="text-[13px] text-brown-l font-light leading-[1.7]">{t.appleInfoText}</p>
                </div>
              </div>
            )}

            {payment === 'card' && (
              <div className="border border-oat rounded-xl p-6 bg-cream">
                <div className="text-[11px] tracking-[2px] uppercase text-brown-l mb-5">{t.cardDataTitle}</div>
                <div className="flex flex-col gap-4">
                  <Field label={t.fieldCardNum} error={errors.cn} errorMsg={t.fieldRequired}>
                    <Input value={card.number} onChange={setC('number')} placeholder="1234 5678 9012 3456" maxLength={19} error={errors.cn} />
                  </Field>
                  <Field label={t.fieldHolder} error={errors.ch} errorMsg={t.fieldRequired}>
                    <Input value={card.holder} onChange={setC('holder')} placeholder="IVAN PETRENKO" className="uppercase" error={errors.ch} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t.fieldExpiry} error={errors.ce} errorMsg={t.fieldRequired}>
                      <Input value={card.expiry} onChange={setC('expiry')} placeholder="MM / YY" maxLength={7} error={errors.ce} />
                    </Field>
                    <Field label={t.fieldCvv} error={errors.cv} errorMsg={t.fieldRequired}>
                      <Input value={card.cvv} onChange={setC('cvv')} placeholder="123" maxLength={3} type="password" error={errors.cv} />
                    </Field>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brown-l flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span className="text-[12px] text-brown-l font-light">{t.sslLabel}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── Right: order summary ── */}
        <div className="lg:sticky lg:top-[88px]">
          <div className="info-card overflow-hidden">
            <div className="px-5 md:px-7 py-5 border-b border-oat">
              <h3 className="font-serif text-[20px] font-normal text-brown">
                {t.orderSummary(count)}
              </h3>
            </div>

            <ul className="px-5 md:px-7 py-5 flex flex-col gap-4 max-h-[340px] overflow-y-auto">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 items-center">
                  <img src={product.thumb} alt={product.name[lang]} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-brown leading-tight">{product.name[lang]}</div>
                    <div className="text-[12px] text-brown-l mt-0.5">{product.weight[lang]}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => onRemove(product.id)} className="w-6 h-6 border border-oat text-brown-l flex items-center justify-center hover:border-brick hover:text-brick transition-colors cursor-none rounded-lg text-sm leading-none">−</button>
                    <span className="w-5 text-center text-[13px] font-medium text-brown">{qty}</span>
                    <button onClick={() => onAdd(product)}      className="w-6 h-6 border border-oat text-brown-l flex items-center justify-center hover:border-brick hover:text-brick transition-colors cursor-none rounded-lg text-sm leading-none">+</button>
                  </div>
                  <span className="text-[14px] font-medium text-brick ml-2 flex-shrink-0">{product.price * qty} ₴</span>
                </li>
              ))}
            </ul>

            <div className="px-5 md:px-7 pb-5 md:pb-7 pt-4 border-t border-oat">

              {/* Promo code */}
              <div className="mb-5">
                {promo ? (
                  <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
                    <div>
                      <div className="text-[12px] tracking-[1.5px] uppercase text-brown-l mb-0.5">{t.promoLabel}</div>
                      <div className="text-[14px] font-medium text-brown">{promo.code} — -{promo.discount}%</div>
                    </div>
                    <button
                      onClick={() => { setPromo(null); setPromoInput('') }}
                      className="text-[20px] text-brown-l hover:text-brick transition-colors cursor-none leading-none"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError(false) }}
                      onKeyDown={e => e.key === 'Enter' && applyPromo()}
                      placeholder={t.promoPlaceholder}
                      className={`flex-1 bg-cream border px-4 py-2.5 text-[14px] text-brown font-light outline-none rounded-xl transition-colors cursor-text uppercase tracking-wider ${promoError ? 'border-brick' : 'border-oat focus:border-brown-l'}`}
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 bg-cream border border-oat text-[13px] text-brown-l rounded-xl hover:border-brown-l hover:text-brown transition-colors cursor-none"
                    >
                      {t.promoApply}
                    </button>
                  </div>
                )}
                {promoError && (
                  <div className="text-[12px] text-brick mt-1.5">{t.promoInvalid}</div>
                )}
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-[13px] text-brown-l">{t.itemsLabel}</span>
                <span className="text-[15px] text-brown">{subtotal} ₴</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-brick">{t.discountLabel(promo.discount)}</span>
                  <span className="text-[13px] text-brick">-{discount} ₴</span>
                </div>
              )}
              <div className="flex justify-between mb-6">
                <span className="text-[13px] text-brown-l">{t.deliveryLabel}</span>
                <span className="text-[13px] text-brown-l">{t.deliveryFree}</span>
              </div>
              <div className="flex justify-between items-baseline mb-6 pb-6 border-b border-oat">
                <span className="text-[13px] tracking-[2px] uppercase text-brown-l">{t.totalLabel}</span>
                <span className="font-serif text-[32px] font-normal text-brown leading-none">{total} ₴</span>
              </div>
              <button onClick={handleSubmit} className="w-full btn-primary py-4 text-center text-[14px]">
                {payment === 'cash' ? t.confirmBtn : payment === 'apple' ? t.appleBtn : t.payBtn(total)}
              </button>
              <p className="text-[12px] text-brown-l text-center mt-4 font-light leading-[1.6]">
                {t.termsNote}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
