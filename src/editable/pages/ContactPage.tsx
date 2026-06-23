'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  const contact = pagesContent.contact
  return (
    <EditableSiteShell>
      <main className={dc.shell.page}>
        {/* Hero */}
        <section className="relative overflow-hidden [background:var(--slot4-hero-bg)] text-white">
          <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[var(--slot4-accent)]/15 blur-[90px]" />
          <div className={`relative ${dc.shell.section} py-16 sm:py-20`}>
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
              <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
              {contact.eyebrow}
            </p>
            <h1 className={`mt-6 ${dc.type.heroTitle} max-w-4xl`}>{contact.title}</h1>
            <p className="mt-7 max-w-2xl border-l-2 border-[var(--slot4-accent)] pl-5 text-lg leading-8 text-white/65">{contact.description}</p>
          </div>
        </section>

        {/* Desks + form */}
        <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="grid gap-4">
              {desks.map((desk, index) => (
                <div key={desk.title} className={`${dc.surface.dark} p-6 sm:p-7`}>
                  <div className="flex items-center justify-between">
                    <desk.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <span className="text-xs font-bold text-white/40">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-extrabold tracking-[-0.015em]">{desk.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/60">{desk.body}</p>
                </div>
              ))}
            </aside>

            <div className={`${dc.surface.card} p-6 sm:p-9 lg:p-10`}>
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-page-text)]">
                <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" /> Send a message
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em]">{contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
