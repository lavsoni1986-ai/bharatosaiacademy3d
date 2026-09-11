import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 1,
      delay = 0,
      start = 'top 80%',
      toggleActions = 'play none none reverse',
    } = options

    const anim = gsap.fromTo(el, from, {
      ...to,
      duration,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions,
      },
    })

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return ref
}
