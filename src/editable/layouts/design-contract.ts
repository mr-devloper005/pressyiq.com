import type { CSSProperties } from 'react'

/**
 * Olioxy-inspired identity for this Media Distribution site.
 * Vivid lime-yellow accent on near-black surfaces, clean white content
 * sections, oversized condensed display type, pill buttons. All visible color
 * comes from these CSS variables so every editable page inherits it at once.
 */
export const editableRootStyle = {
  '--slot4-page-bg': '#f3f3f0',
  '--slot4-page-text': '#0c0c0c',
  '--slot4-panel-bg': '#ecebe5',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#56544f',
  '--slot4-soft-muted-text': '#85837d',
  '--slot4-accent': '#e6f24b',
  '--slot4-accent-fill': '#e6f24b',
  '--slot4-accent-soft': '#f3f7c4',
  '--slot4-dark-bg': '#0a0a0a',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e7e6e0',
  '--slot4-cream': '#f3f3f0',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#e6f24b',
  '--slot4-gray': '#ebeae4',
  '--slot4-body-gradient': 'linear-gradient(180deg, #f3f3f0 0%, #ffffff 55%, #eeede7 100%)',
  /* Extended Olioxy tokens (additive — original tokens above are preserved). */
  '--slot4-accent-2': '#e6f24b',
  '--slot4-accent-3': '#c7d92f',
  '--slot4-ink-soft': '#33322e',
  '--slot4-line': 'rgba(12,12,12,0.12)',
  '--slot4-gradient': 'linear-gradient(120deg, #e6f24b 0%, #d6e63f 100%)',
  '--slot4-gradient-soft': 'linear-gradient(120deg, #e6f24b 0%, #eef58a 100%)',
  '--slot4-hero-bg': 'radial-gradient(120% 130% at 50% -10%, #1c1c1c 0%, #0c0c0c 58%, #050505 100%)',
  '--slot4-dark-panel': 'linear-gradient(160deg, #171717 0%, #0a0a0a 100%)',
  '--slot4-glow': '0 0 0 1px rgba(230,242,75,0.55), 0 26px 60px rgba(0,0,0,0.45)',
  /* Legacy aliases used by older page layouts — these were undefined in the
     base template, which made pages collapse to full width. Defining them here
     gives every editable page a proper container + border at once. */
  '--editable-container': '1200px',
  '--editable-border': 'rgba(12,12,12,0.12)',
  '--editable-page-bg': '#f3f3f0',
  '--editable-page-text': '#0c0c0c',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--slot4-line)]',
  darkBorder: 'border-white/12',
  shadow: 'shadow-[0_8px_30px_rgba(12,12,12,0.07)]',
  shadowStrong: 'shadow-[0_28px_70px_rgba(12,12,12,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(5,5,5,0.05),rgba(5,5,5,0.82))]',
  /* Used only on dark surfaces — yellow is unreadable on light. */
  gradientText: 'text-[var(--slot4-accent)]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[320px]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.24em]',
    /* Oversized condensed display — the Anton face is applied via .slot4-hero-display. */
    heroTitle: 'slot4-hero-display text-5xl uppercase leading-[0.92] tracking-[-0.01em] sm:text-7xl lg:text-[6.4rem]',
    sectionTitle: 'text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[2.8rem]',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} bg-[var(--slot4-panel-bg)]`,
    dark: `rounded-2xl border border-white/10 [background:var(--slot4-dark-panel)] ${editablePalette.darkText}`,
  },
  button: {
    primary:
      'group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-bold tracking-[-0.01em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-3)] hover:shadow-[0_16px_34px_rgba(230,242,75,0.4)]',
    secondary:
      'group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-bold tracking-[-0.01em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)] hover:text-black',
    accent:
      'group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-bold tracking-[-0.01em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-3)]',
    ghostDark:
      'group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(12,12,12,0.16)]',
    glow: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--slot4-glow)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use an Olioxy-style identity: near-black hero/footer, vivid lime-yellow accents, clean white content sections, oversized condensed uppercase display headlines, and pill buttons.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() for all post links so route aliases and task-specific detail pages remain functional.',
  'Homepage cards are text-first (title, summary, category, CTA) with no images; image-led cards are reserved for archive and detail pages.',
  'Yellow is for fills and dark-surface accents only; on light surfaces use near-black text with yellow highlights/pills.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a reference publication name or logo.',
] as const
