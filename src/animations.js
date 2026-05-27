/**
 * Animation utilities for Matrix RPG app using motion.dev
 * Handles view transitions, element reveals, and interactive elements
 */

import { animate, stagger } from 'motion'

/**
 * Animate view transitions with a Matrix-themed effect
 * Fades out current view and brings in new view with scale/translate
 */
export function animateViewTransition() {
  const viewShell = document.querySelector('.view-shell')
  if (!viewShell) return

  // Reset any previous animations
  viewShell.style.opacity = '0'
  viewShell.style.transform = 'scale(0.95) translateY(10px)'

  // Fade in and scale animation
  animate(
    viewShell,
    {
      opacity: [0, 1],
      transform: ['scale(0.95) translateY(10px)', 'scale(1) translateY(0)'],
    },
    {
      duration: 0.5,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  )
}

/**
 * Animate hero section elements with staggered entrance
 */
export function animateHeroElements() {
  const heroPanel = document.querySelector('.hero-panel')
  if (!heroPanel) return

  const copy = heroPanel.querySelector('.hero-copy')
  const cta = heroPanel.querySelector('.hero-cta-row')

  if (copy) {
    animate(
      copy,
      { opacity: [0, 1], transform: ['translateX(-20px)', 'translateX(0)'] },
      { duration: 0.6, delay: 0.1, easing: 'ease-out' },
    )
  }

  if (cta) {
    animate(
      cta,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      { duration: 0.5, delay: 0.3, easing: 'ease-out' },
    )
  }
}

/**
 * Animate hero grid sections with staggered reveal
 */
export function animateHeroGrid() {
  const sections = document.querySelectorAll('.hero-grid > section')
  if (!sections.length) return

  animate(
    sections,
    { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
    {
      duration: 0.5,
      delay: stagger(0.1, { start: 0.2 }),
      easing: 'ease-out',
    },
  )
}

/**
 * Animate timeline cards with staggered entrance from left
 */
export function animateTimelineCards() {
  const cards = document.querySelectorAll('.timeline-card')
  if (!cards.length) return

  animate(
    cards,
    { opacity: [0, 1], transform: ['translateX(-30px)', 'translateX(0)'] },
    {
      duration: 0.5,
      delay: stagger(0.15, { start: 0.2 }),
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  )
}

/**
 * Animate the action banner with scale and fade
 */
export function animateActionBanner() {
  const banner = document.querySelector('.action-banner')
  if (!banner) return

  animate(
    banner,
    { opacity: [0, 1], transform: ['scale(0.95)', 'scale(1)'] },
    {
      duration: 0.6,
      delay: 0.4,
      easing: 'ease-out',
    },
  )
}

/**
 * Animate roster cards with staggered reveal
 */
export function animateRosterCards() {
  const cards = document.querySelectorAll('.roster-card')
  if (!cards.length) return

  animate(
    cards,
    { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0)'] },
    {
      duration: 0.4,
      delay: stagger(0.05, { start: 0.1 }),
      easing: 'ease-out',
    },
  )
}

/**
 * Animate sheet cards with staggered entrance
 */
export function animateSheetCards() {
  const cards = document.querySelectorAll('.sheet-card')
  if (!cards.length) return

  animate(
    cards,
    { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
    {
      duration: 0.5,
      delay: stagger(0.08, { start: 0.15 }),
      easing: 'ease-out',
    },
  )
}

/**
 * Animate sheet tabs with fade and scale
 */
export function animateSheetTabs() {
  const tabs = document.querySelectorAll('.sheet-tab')
  if (!tabs.length) return

  animate(
    tabs,
    { opacity: [0, 1], scale: [0.95, 1] },
    {
      duration: 0.3,
      delay: stagger(0.05),
      easing: 'ease-out',
    },
  )
}

/**
 * Add interactive hover animations to buttons
 */
export function setupButtonAnimations() {
  const buttons = document.querySelectorAll(
    '.pill-button, .ghost-button, .solid-button, .danger-button, .route-link, .sheet-tab',
  )

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      animate(button, { scale: [1, 1.05] }, { duration: 0.2, easing: 'ease-out' })
    })

    button.addEventListener('mouseleave', () => {
      animate(button, { scale: [1.05, 1] }, { duration: 0.2, easing: 'ease-out' })
    })
  })
}

/**
 * Animate individual cards when hovered (roster, sheet cards, etc)
 */
export function setupCardAnimations() {
  const cards = document.querySelectorAll('.roster-card, .sheet-card, .timeline-card, .hero-panel')

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      animate(card, { borderColor: 'var(--line-strong)' }, { duration: 0.2 })
    })

    card.addEventListener('mouseleave', () => {
      animate(card, { borderColor: 'var(--line)' }, { duration: 0.2 })
    })
  })
}

/**
 * Orchestrate all animations for the current view
 * Intelligently detects which elements are present and animates them
 */
export function animateCurrentView() {
  // Always animate the view transition
  animateViewTransition()

  // Determine which view elements are present and animate them
  if (document.querySelector('.hero-panel.hero-view')) {
    // Home view
    animateHeroElements()
    setTimeout(animateHeroGrid, 200)
  }

  if (document.querySelector('.learn-view')) {
    // Learn view
    animateTimelineCards()
    setTimeout(animateActionBanner, 300)
  }

  if (document.querySelector('.jack-in-view')) {
    // Jack In (builder) view
    animateSheetTabs()
    setTimeout(animateSheetCards, 100)
  }

  // Always animate roster if present
  setTimeout(animateRosterCards, 50)
}

/**
 * Setup all interactive element animations (hover effects, etc)
 */
export function setupInteractiveAnimations() {
  setupButtonAnimations()
  setupCardAnimations()
}

/**
 * Pulse animation for attention-grabbing elements
 */
export function animatePulse(element, duration = 0.6) {
  if (!element) return

  animate(
    element,
    {
      opacity: [1, 0.7, 1],
      transform: ['scale(1)', 'scale(1.02)', 'scale(1)'],
    },
    {
      duration,
      repeat: 1,
      easing: 'ease-in-out',
    },
  )
}

/**
 * Glitch animation for error states or dramatic effects
 */
export function animateGlitch(element, intensity = 5) {
  if (!element) return

  const glitchFrames = []
  for (let i = 0; i < intensity; i++) {
    glitchFrames.push({
      transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
      opacity: Math.random() > 0.3 ? 1 : 0.9,
    })
  }
  glitchFrames.push({ transform: 'translateX(0)', opacity: 1 })

  animate(element, glitchFrames, {
    duration: 0.3,
    easing: 'ease-in-out',
  })
}
