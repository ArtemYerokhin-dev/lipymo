import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')

    const onMove = (e) => {
      cur.style.left = e.clientX + 'px'
      cur.style.top  = e.clientY + 'px'
    }

    const HOVER_SEL = 'a, button, [data-hover]'
    const onOver = (e) => { if (e.target.closest(HOVER_SEL)) cur.classList.add('hover') }
    const onOut  = (e) => { if (e.target.closest(HOVER_SEL)) cur.classList.remove('hover') }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [])

  return <div id="cur" />
}
