import { createContext, useContext, useState } from 'react'

const Ctx = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lipimo_lang') || 'uk')

  const toggle = () => setLang(l => {
    const next = l === 'uk' ? 'en' : 'uk'
    localStorage.setItem('lipimo_lang', next)
    return next
  })

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
