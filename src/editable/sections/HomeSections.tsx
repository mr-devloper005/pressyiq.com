import Link from 'next/link'
import { ArrowUpRight, Megaphone, Radio, Search, TrendingUp } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, getEditableCategory, getEditableExcerpt, postHref, TextPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

const CAPABILITIES = [
  'Press Release Distribution',
  'Media Outreach',
  'News Syndication',
  'Brand Visibility',
  'PR Campaign Management',
]

function Eyebrow({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={`flex items-center gap-2.5 ${dc.type.eyebrow} ${tone === 'dark' ? 'text-white/70' : 'text-[var(--slot4-page-text)]'}`}>
      <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
      {children}
    </p>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 ${dc.type.sectionTitle}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-8 ${pal.mutedText}`}>{description}</p> : null}
    </div>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const hero = pagesContent.home.hero
  const heroTitle = Array.isArray(hero.title) ? hero.title : [hero.title]
  const panelPosts = posts.slice(0, 4)

  return (
    <section className="relative overflow-hidden [background:var(--slot4-hero-bg)] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="slot4-aurora absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/20 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className={`relative ${dc.shell.section} pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24`}>
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <span
              data-reveal="1"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-white/80"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--slot4-accent)]" />
              {hero.badge}
            </span>

            <h1 data-reveal="2" className={`mt-6 ${dc.type.heroTitle}`}>
              {heroTitle.map((line, i) => (
                <span key={i} className="block">
                  {i === heroTitle.length - 1 ? <span className="text-[var(--slot4-accent)]">{line}</span> : line}
                </span>
              ))}
            </h1>

            <p data-reveal="3" className="mt-7 max-w-xl text-lg leading-8 text-white/65">
              {hero.description}
            </p>

            <div data-reveal="4" className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={hero.primaryCta.href} className={dc.button.primary}>
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href={hero.secondaryCta.href} className={dc.button.ghostDark}>
                {hero.secondaryCta.label}
              </Link>
            </div>

            <div data-reveal="5" className="mt-10 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((cap) => (
                <span key={cap} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/60">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Live distribution feed — text-only cards */}
          <div data-reveal="6" className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-7">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                <Radio className="h-4 w-4 text-[var(--slot4-accent)]" /> Live distribution feed
              </p>
              <Link href={primaryRoute} className="text-xs font-bold text-[var(--slot4-accent)] hover:text-white">
                View all
              </Link>
            </div>

            {panelPosts.length ? (
              <div className="mt-5 grid gap-3">
                {panelPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={postHref(primaryTask, post, primaryRoute)}
                    className="group grid grid-cols-[40px_1fr] items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/50 hover:bg-white/[0.05]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--slot4-accent)] text-sm font-extrabold text-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{getEditableCategory(post)}</p>
                      <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-[var(--slot4-accent)]">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm leading-7 text-white/55">
                Your published releases and media updates appear here as they go live across the network.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const cards = posts.slice(0, 6)
  if (!cards.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The daily edit"
            title="Latest stories across the network"
            description="Fresh releases, media coverage, and public updates — distributed and syndicated in real time."
          />
          <Link href={primaryRoute} className="group inline-flex items-center gap-1.5 text-sm font-bold text-black underline decoration-[var(--slot4-accent)] decoration-[4px] underline-offset-4">
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="slot4-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((post, index) => (
            <TextPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const list = posts.slice(1, 5)
  if (!feature) return null
  return (
    <section className="relative overflow-hidden [background:var(--slot4-dark-panel)] text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/14 blur-[95px]" />
      <div className={`relative ${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
            <TrendingUp className="h-4 w-4" /> Essential reading
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.04] tracking-[-0.02em] sm:text-[2.8rem]">
            Features that move the conversation forward
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Link
            href={postHref(primaryTask, feature, primaryRoute)}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/50 sm:p-10"
          >
            <div>
              <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                Cover feature
              </span>
              <h3 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-4xl">{feature.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/65">{getEditableExcerpt(feature, 220)}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]">
              Read the feature
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <div className="slot4-stagger grid gap-3">
            {list.map((post, index) => (
              <Link
                key={post.id}
                href={postHref(primaryTask, post, primaryRoute)}
                className="group grid grid-cols-[44px_1fr] items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/50 hover:bg-white/[0.05]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--slot4-accent)] text-sm font-extrabold text-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{getEditableCategory(post)}</p>
                  <h4 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-[var(--slot4-accent)]">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : posts.slice(2)
  const lead = source[0] || posts[0]
  const feature = source.slice(1, 4)
  const briefs = source.slice(4, 10)
  if (!lead) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <SectionHeading
          eyebrow="From the newsroom"
          title="More to discover"
          description="Keep exploring the latest announcements, syndicated coverage, and public updates from across every category."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-6">
            <Link
              href={postHref(primaryTask, lead, primaryRoute)}
              className={`group rounded-2xl border border-white/10 [background:var(--slot4-dark-panel)] p-8 text-white ${dc.motion.glow} sm:p-10`}
            >
              <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                Editor&apos;s pick
              </span>
              <h3 className="mt-6 text-2xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-3xl">{lead.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">{getEditableExcerpt(lead, 220)}</p>
              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]">
                Read story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <div className="slot4-stagger grid gap-6 sm:grid-cols-3">
              {feature.map((post, index) => (
                <TextPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--slot4-line)] bg-[var(--slot4-panel-bg)] p-7">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
              <Megaphone className="h-4 w-4" /> The briefing
            </p>
            <h3 className="mt-3 text-xl font-extrabold tracking-[-0.01em]">Quick reads</h3>
            <div className="mt-3">
              {briefs.length ? (
                briefs.map((post, index) => (
                  <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))
              ) : (
                <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">New short updates appear here as they publish.</p>
              )}
            </div>
          </aside>
        </div>

        <form
          action="/search"
          className="mt-14 grid gap-6 rounded-2xl bg-[var(--slot4-accent)] p-8 text-black sm:grid-cols-[1fr_auto] sm:items-center sm:p-10"
        >
          <div>
            <h3 className="text-2xl font-extrabold tracking-[-0.015em] sm:text-3xl">Search the full archive</h3>
            <p className="mt-2 text-sm font-medium text-black/70">
              Explore every {taskLabel(primaryTask).toLowerCase()} published by {SITE_CONFIG.name}.
            </p>
          </div>
          <label className="flex overflow-hidden rounded-full bg-white p-1.5 sm:min-w-[420px]">
            <span className="grid w-11 place-items-center text-[var(--slot4-soft-muted-text)]"><Search className="h-4 w-4" /></span>
            <input name="q" placeholder="Search stories, companies, categories" className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-[var(--slot4-page-text)] outline-none" />
            <button className="shrink-0 rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} pb-20 pt-4 sm:pb-24`}>
        <div className="relative overflow-hidden rounded-[2rem] [background:var(--slot4-hero-bg)] px-7 py-16 text-white sm:px-14 sm:py-20">
          <div className="slot4-aurora pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/16 blur-[90px]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
              <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
              {cta.badge}
            </p>
            <h2 className="slot4-hero-display mt-5 text-4xl uppercase leading-[0.95] tracking-[-0.005em] sm:text-6xl">{cta.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">{cta.description}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={cta.primaryCta.href} className={dc.button.primary}>
                {cta.primaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href={cta.secondaryCta.href} className={dc.button.ghostDark}>
                {cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
