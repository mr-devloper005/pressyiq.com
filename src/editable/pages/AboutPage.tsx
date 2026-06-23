import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const about = pagesContent.about
  return (
    <EditableSiteShell>
      <main className={dc.shell.page}>
        {/* Hero */}
        <section className="relative overflow-hidden [background:var(--slot4-hero-bg)] text-white">
          <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/15 blur-[90px]" />
          <div className={`relative ${dc.shell.section} py-16 sm:py-20 lg:py-24`}>
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
              <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
              {about.badge}
            </p>
            <h1 className={`mt-6 ${dc.type.heroTitle} max-w-4xl`}>
              Independent media, built for <span className="text-[var(--slot4-accent)]">clear stories.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">{about.description}</p>
          </div>
        </section>

        {/* Story + values */}
        <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            <article className={`${dc.surface.card} p-7 sm:p-10 lg:p-12`}>
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-page-text)]">
                <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" /> About {SITE_CONFIG.name}
              </p>
              <p className="mt-6 text-2xl font-extrabold leading-[1.25] tracking-[-0.015em] sm:text-3xl">{about.description}</p>
              <div className="article-content mt-8 space-y-5">
                {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <aside className="grid gap-5">
              {about.values.map((value, index) => (
                <div key={value.title} className={`${dc.surface.soft} p-6 sm:p-7`}>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-sm font-extrabold text-[var(--slot4-accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-4 text-xl font-extrabold leading-tight tracking-[-0.015em]">{value.title}</h2>
                  <p className={`mt-3 text-sm leading-7 ${pal.mutedText}`}>{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className={`${dc.shell.section} pb-20 sm:pb-24`}>
          <div className="flex flex-col gap-6 rounded-2xl [background:var(--slot4-dark-panel)] px-7 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="slot4-hero-display max-w-3xl text-3xl uppercase leading-[0.98] sm:text-5xl">Read the stories shaping the conversation.</h2>
            <Link href="/search" className={`${dc.button.primary} w-fit shrink-0`}>
              Explore the archive
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
