import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Latest'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/** Pill used for categories / labels across cards. */
function CategoryPill({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
        tone === 'dark' ? 'bg-[var(--slot4-accent)] text-black' : 'bg-[var(--slot4-accent)] text-black'
      }`}
    >
      {children}
    </span>
  )
}

/** Numbered index chip (black square, yellow on hover) — Olioxy accent. */
function IndexChip({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-extrabold transition-colors ${
        dark ? 'bg-white/10 text-[var(--slot4-accent)]' : 'bg-black text-[var(--slot4-accent)]'
      }`}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Cover story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] text-white">
      <div className="relative aspect-[16/10] min-h-[430px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.05),rgba(5,5,5,0.9))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <CategoryPill tone="dark">{label}</CategoryPill>
          <h3 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">{getEditableExcerpt(post, 190)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4"><CategoryPill tone="dark">{getEditableCategory(post)}</CategoryPill></div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-3 text-lg font-extrabold leading-[1.16] tracking-[-0.01em]">{post.title}</h3>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-black underline decoration-[var(--slot4-accent)] decoration-[4px] underline-offset-4">Read story <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[36px_1fr] items-start gap-4 border-t border-[var(--slot4-line)] py-5 first:border-t-0">
      <IndexChip n={index + 1} />
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-base font-bold leading-snug tracking-[-0.01em] decoration-[var(--slot4-accent)] decoration-[3px] underline-offset-4 group-hover:underline">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift} sm:grid-cols-[280px_minmax(0,1fr)]`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[220px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4"><CategoryPill tone="dark">{getEditableCategory(post)}</CategoryPill></div>
      </div>
      <div className="min-w-0 p-6 sm:p-8">
        <p className={`${dc.type.eyebrow} text-[var(--slot4-soft-muted-text)]`}>{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-extrabold leading-[1.08] tracking-[-0.015em] decoration-[var(--slot4-accent)] decoration-[5px] underline-offset-4 group-hover:underline sm:text-[1.7rem]">{post.title}</h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 190)}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-black">Read story <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

/**
 * Text-first card for the homepage (no imagery, per design contract).
 * Shows category, title, summary, and a CTA.
 */
export function TextPostCard({ post, href, index }: { post: SitePost; href: string; index?: number }) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col justify-between rounded-2xl border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] p-6 ${pal.shadow} ${dc.motion.lift} hover:border-[var(--slot4-accent)] sm:p-7`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <CategoryPill>{getEditableCategory(post)}</CategoryPill>
          {typeof index === 'number' ? (
            <span className="text-sm font-extrabold text-[var(--slot4-page-text)]/30">{String(index + 1).padStart(2, '0')}</span>
          ) : null}
        </div>
        <h3 className="mt-5 line-clamp-2 text-xl font-extrabold leading-[1.16] tracking-[-0.015em]">{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 150)}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-black underline decoration-[var(--slot4-accent)] decoration-[4px] underline-offset-4">
        Read story <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
