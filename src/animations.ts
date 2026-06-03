import { animate, stagger } from 'motion'

// ── Existing entrance animations ─────────────────────────────────────────────

export function animateViewTransition() {
  const viewShell = document.querySelector('.view-shell')
  if (!viewShell) return
  animate(
    viewShell,
    { opacity: [0, 1], transform: ['scale(0.95) translateY(10px)', 'scale(1) translateY(0)'] },
    { duration: 0.5, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  )
}

export function animateHeroElements() {
  const heroPanel = document.querySelector('.hero-panel')
  if (!heroPanel) return
  const copy = heroPanel.querySelector('.hero-copy')
  const cta = heroPanel.querySelector('.hero-cta-row')
  if (copy) animate(copy, { opacity: [0, 1], transform: ['translateX(-20px)', 'translateX(0)'] }, { duration: 0.6, delay: 0.1, easing: 'ease-out' })
  if (cta) animate(cta, { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, { duration: 0.5, delay: 0.3, easing: 'ease-out' })
}

export function animateHeroGrid() {
  const sections = document.querySelectorAll('.hero-grid > section')
  if (!sections.length) return
  animate(sections, { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] }, { duration: 0.5, delay: stagger(0.1, { start: 0.2 }), easing: 'ease-out' })
}

export function animateTimelineCards() {
  const cards = document.querySelectorAll('.timeline-card')
  if (!cards.length) return
  animate(cards, { opacity: [0, 1], transform: ['translateX(-30px)', 'translateX(0)'] }, { duration: 0.5, delay: stagger(0.15, { start: 0.2 }), easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' })
}

export function animateLearnCards() {
  const cards = document.querySelectorAll('.learn-card')
  if (!cards.length) return
  animate(cards, { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0)'] }, { duration: 0.8, delay: stagger(0.12, { start: 0.18 }), easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
}

export function animateActionBanner() {
  const banner = document.querySelector('.action-banner')
  if (!banner) return
  animate(banner, { opacity: [0, 1], transform: ['scale(0.95)', 'scale(1)'] }, { duration: 0.6, delay: 0.4, easing: 'ease-out' })
}

export function animateRosterCards() {
  const cards = document.querySelectorAll('.roster-card')
  if (!cards.length) return
  animate(cards, { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: 0.4, delay: stagger(0.05, { start: 0.1 }), easing: 'ease-out' })
}

export function animateSheetCards() {
  const cards = document.querySelectorAll('.sheet-card')
  if (!cards.length) return
  animate(cards, { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, { duration: 0.5, delay: stagger(0.08, { start: 0.15 }), easing: 'ease-out' })
}

export function animateSheetTabs() {
  const tabs = document.querySelectorAll('.sheet-tab')
  if (!tabs.length) return
  animate(tabs, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.3, delay: stagger(0.05), easing: 'ease-out' })
}

function primeElementState(element: Element | null, styles: Partial<CSSStyleDeclaration>) {
  if (!(element instanceof HTMLElement)) return
  Object.assign(element.style, styles)
}

function primeElementsState(elements: NodeListOf<Element>, styles: Partial<CSSStyleDeclaration>) {
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      Object.assign(element.style, styles)
    }
  })
}

export function animateJackInShell() {
  const hero = document.querySelector('.builder-hero')
  const panel = document.querySelector('.sheet-panel')
  const roster = document.querySelector('.save-rail')
  const cards = document.querySelectorAll('.sheet-card')
  const tabs = document.querySelectorAll('.sheet-tab')

  primeElementState(hero, { opacity: '0', transform: 'translateY(24px)' })
  primeElementState(panel, { opacity: '0', transform: 'translateY(24px)' })
  primeElementState(roster, { opacity: '0', transform: 'translateX(-24px)' })
  primeElementsState(cards, { opacity: '0', clipPath: 'inset(0 0 100% 0)' })
  primeElementsState(tabs, { opacity: '0', transform: 'scale(0.95)' })

  if (hero) {
    animate(hero, { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] }, { duration: 0.8, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
  }

  if (panel) {
    animate(panel, { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] }, { duration: 0.85, delay: 0.12, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
  }

  if (roster) {
    animate(roster, { opacity: [0, 1], transform: ['translateX(-24px)', 'translateX(0)'] }, { duration: 0.75, delay: 0.08, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
  }
}

export function setupButtonAnimations() {
  const buttons = document.querySelectorAll('.pill-button:not(.no-scale), .ghost-button:not(.no-scale), .solid-button:not(.no-scale), .danger-button:not(.no-scale), .route-link:not(.no-scale), .sheet-tab:not(.no-scale)')
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => animate(button, { scale: [1, 1.05] }, { duration: 0.2, easing: 'ease-out' }))
    button.addEventListener('mouseleave', () => animate(button, { scale: [1.05, 1] }, { duration: 0.2, easing: 'ease-out' }))
  })
}

export function setupCardAnimations() {
  const cards = document.querySelectorAll('.roster-card, .sheet-card, .timeline-card, .hero-panel')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => animate(card, { borderColor: 'var(--line-strong)' }, { duration: 0.2 }))
    card.addEventListener('mouseleave', () => animate(card, { borderColor: 'var(--line)' }, { duration: 0.2 }))
  })
}

export function animatePulse(element: Element, duration = 0.6) {
  if (!element) return
  animate(element, { opacity: [1, 0.7, 1], transform: ['scale(1)', 'scale(1.02)', 'scale(1)'] }, { duration, repeat: 1, easing: 'ease-in-out' })
}

export function animateGlitch(element: Element, intensity = 5) {
  if (!element) return
  const frames: { transform: string; opacity: number }[] = []
  for (let i = 0; i < intensity; i++) {
    frames.push({ transform: `translateX(${(Math.random() - 0.5) * 8}px)`, opacity: Math.random() > 0.3 ? 1 : 0.9 })
  }
  frames.push({ transform: 'translateX(0)', opacity: 1 })
  animate(element, frames, { duration: 0.3, easing: 'ease-in-out' })
}

// ── Matrix-themed animations ─────────────────────────────────────────────────

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&|<>[]ABCDEF'

/**
 * Classic Matrix decode — cycles random katakana/symbols before revealing real text.
 */
export function animateTextScramble(element: HTMLElement, duration = 900) {
  const original = element.textContent || ''
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const resolved = Math.floor(progress * original.length)

    element.textContent = original
      .split('')
      .map((char, i) => {
        if (char === ' ' || char === '\n') return char
        if (i < resolved) return char
        return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      })
      .join('')

    if (progress < 1) requestAnimationFrame(tick)
    else element.textContent = original
  }

  requestAnimationFrame(tick)
}

/**
 * Clip-path scanline wipe from top + green border flash.
 * Replaces plain fade-up for sheet cards.
 */
export function animateGlitchReveal(elements: Element | Element[] | NodeListOf<Element>, delayOffset = 0) {
  const els = elements instanceof Element ? [elements] : Array.from(elements as NodeListOf<Element>)
  if (!els.length) return

  els.forEach((el, i) => {
    const delay = delayOffset + i * 0.08

    animate(
      el,
      { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'], opacity: [0, 1] },
      { duration: 0.65, delay, easing: [0.22, 1, 0.36, 1] },
    )

    animate(
      el,
      { borderColor: ['rgba(0,255,65,0.8)', 'var(--line)'] },
      { duration: 1.0, delay: delay + 0.1, easing: 'ease-out' },
    )
  })
}

/**
 * Phone screen boot flicker — called when crew powers on their field phone.
 */
export function animatePhoneBootUp(screenEl: HTMLElement) {
  animate(
    screenEl,
    {
      opacity: [0, 0.5, 0.1, 1, 0.7, 1],
      filter: ['brightness(4) contrast(2)', 'brightness(0.3)', 'brightness(3)', 'brightness(0.8)', 'brightness(1)'],
    },
    { duration: 0.55, easing: 'ease-in-out' },
  )
}

/**
 * Zion Mesh connects — green pulse sweep on the connection banner.
 */
export function animateConnectionFlash(bannerEl: HTMLElement) {
  animate(
    bannerEl,
    { opacity: [0, 1], backgroundColor: ['rgba(0,255,65,0.22)', 'rgba(0,0,0,0)'] },
    { duration: 1.1, easing: 'ease-out' },
  )
}

/**
 * New message arrival — slides in from the left with a green flash.
 */
export function animateNewMessage(el: HTMLElement) {
  animate(
    el,
    {
      opacity: [0, 1],
      transform: ['translateX(-12px)', 'translateX(0)'],
      backgroundColor: ['rgba(0,255,65,0.18)', 'rgba(0,0,0,0)'],
    },
    { duration: 0.4, easing: [0.34, 1.56, 0.64, 1] },
  )
}

/**
 * Red pill / blue pill glow on hover — stronger than the generic button scale.
 */
function setupPillButtonAnimations() {
  const red = document.querySelector('.pill-button.red-pill') as HTMLElement | null
  const blue = document.querySelector('.pill-button.blue-pill') as HTMLElement | null

  if (red) {
    red.addEventListener('mouseenter', () => animate(red, { boxShadow: '0 0 28px rgba(220,38,38,0.75)', scale: 1.07 }, { duration: 0.25 }))
    red.addEventListener('mouseleave', () => animate(red, { boxShadow: '0 0 0px rgba(220,38,38,0)', scale: 1 }, { duration: 0.25 }))
  }

  if (blue) {
    blue.addEventListener('mouseenter', () => animate(blue, { boxShadow: '0 0 28px rgba(37,99,235,0.75)', scale: 1.07 }, { duration: 0.25 }))
    blue.addEventListener('mouseleave', () => animate(blue, { boxShadow: '0 0 0px rgba(37,99,235,0)', scale: 1 }, { duration: 0.25 }))
  }
}

/**
 * Large-displacement glitch specifically for h1 headings
 */
function glitchH1(element: HTMLElement, intensity = 12) {
  const frames: { transform: string; opacity: number }[] = []
  for (let i = 0; i < intensity; i++) {
    // Larger displacement: ±12px instead of ±4px
    frames.push({
      transform: `translateX(${(Math.random() - 0.5) * 24}px)`,
      opacity: Math.random() > 0.2 ? 1 : 0.85,
    })
  }
  frames.push({ transform: 'translateX(0)', opacity: 1 })
  animate(element, frames, { duration: 0.3, easing: 'ease-in-out' })
}

/**
 * Dramatic glitch on all h1 headings
 */
function animateAllH1Glitches() {
  const headings = document.querySelectorAll('h1')
  if (!headings.length) return

  headings.forEach((h1, i) => {
    setTimeout(() => {
      glitchH1(h1 as HTMLElement, 16)
      setTimeout(() => glitchH1(h1 as HTMLElement, 12), 350)
    }, 30 + i * 60)
  })
}

// ── Orchestration ─────────────────────────────────────────────────────────────

export function animateCurrentView() {
  animateViewTransition()
  animateAllH1Glitches()

  if (document.querySelector('.hero-panel.hero-view')) {
    animateHeroElements()
    setTimeout(animateHeroGrid, 200)
    // Matrix decode on the main headline — starts mid-fade-in for layered effect
    const h1 = document.querySelector('.hero-copy h1') as HTMLElement | null
    if (h1) setTimeout(() => animateTextScramble(h1, 900), 150)
  }

  if (document.querySelector('.learn-view')) {
    animateLearnCards()
    animateTimelineCards()
    setTimeout(animateActionBanner, 450)
    // Decode the learn view headline too
    const h1 = document.querySelector('.learn-view h1') as HTMLElement | null
    if (h1) setTimeout(() => animateTextScramble(h1, 1200), 260)
  }

  if (document.querySelector('.jack-in-view')) {
    animateJackInShell()
    animateSheetTabs()
    // Glitch reveal instead of plain fade-up
    setTimeout(() => animateGlitchReveal(document.querySelectorAll('.sheet-card')), 220)
    
    // Scramble the Jack In heading just like Learn and Home
    const h1 = document.querySelector('.jack-in-view h1') as HTMLElement | null
    if (h1) setTimeout(() => animateTextScramble(h1, 1000), 180)
  }

  setTimeout(animateRosterCards, 50)
}

export function setupInteractiveAnimations() {
  setupButtonAnimations()
  setupCardAnimations()
  setupPillButtonAnimations()
}
