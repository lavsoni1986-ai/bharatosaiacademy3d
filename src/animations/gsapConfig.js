import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
  )
}

export const fadeIn = (element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: 'power2.out' }
  )
}

export const scaleIn = (element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
  )
}

export const slideInLeft = (element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  )
}

export const slideInRight = (element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  )
}

export const staggerFadeIn = (elements, stagger = 0.1, delay = 0) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, stagger, delay, ease: 'power3.out' }
  )
}

export const createScrollTrigger = (element, animation, start = 'top 80%') => {
  return ScrollTrigger.create({
    trigger: element,
    start,
    onEnter: () => animation.play(),
    onLeaveBack: () => animation.reverse(),
  })
}

export const parallaxScroll = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}
