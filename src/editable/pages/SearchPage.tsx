import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

const inputClass = 'min-w-0 flex-1 bg-transparent text-base font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]'
const fieldWrap = 'flex items-center gap-3 rounded-xl border border-[var(--slot4-line)] bg-white px-4 py-3'

function SearchResultCard({ post }: { post: SitePost; index?: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link href={href} className={`group flex flex-col overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">{taskLabel}</span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {!image ? <span className="w-fit rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">{taskLabel}</span> : null}
        <h2 className="mt-4 line-clamp-3 text-xl font-extrabold leading-[1.14] tracking-[-0.015em]">{post.title}</h2>
        {summary ? <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{summary}</p> : null}
        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-bold text-black underline decoration-[var(--slot4-accent)] decoration-[4px] underline-offset-4">Open result <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className={dc.shell.page}>
        {/* Search hero */}
        <section className="relative overflow-hidden [background:var(--slot4-hero-bg)] text-white">
          <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/15 blur-[90px]" />
          <div className={`relative ${dc.shell.section} py-16 sm:py-20`}>
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                  <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
                  {pagesContent.search.hero.badge}
                </p>
                <h1 className={`mt-6 ${dc.type.heroTitle}`}>{pagesContent.search.hero.title}</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{pagesContent.search.hero.description}</p>
              </div>

              <form action="/search" className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6">
                <input type="hidden" name="master" value="1" />
                <label className={fieldWrap}>
                  <Search className="h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className={inputClass} />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className={fieldWrap}>
                    <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                    <input name="category" defaultValue={category} placeholder="Category" className={inputClass} />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-xl border border-[var(--slot4-line)] bg-white px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-bold tracking-[-0.01em] text-black transition duration-300 hover:bg-white" type="submit">Search</button>
              </form>
            </div>
          </div>
        </section>

        <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--slot4-line)] pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/updates" className="group inline-flex items-center gap-1.5 text-sm font-bold text-black underline decoration-[var(--slot4-accent)] decoration-[4px] underline-offset-4">
              Browse latest <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {results.length ? (
            <div className="slot4-stagger mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className={`mt-8 ${dc.surface.soft} p-10 text-center`}>
              <p className="text-2xl font-extrabold tracking-[-0.02em]">No matching posts found.</p>
              <p className={`mt-3 text-sm ${pal.mutedText}`}>Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
