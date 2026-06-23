'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const columns = globalContent.footer?.columns || []

  return (
    <footer className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-white">
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Yellow CTA band */}
        <div className="grid gap-8 rounded-[1.75rem] bg-[var(--slot4-accent)] p-8 text-black sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center -mt-16 mb-16 shadow-[0_28px_70px_rgba(0,0,0,0.4)]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-black/70">Ready to get seen</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[2.6rem]">
              Launch your next press release across the network.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={session ? '/create' : '/signup'}
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
            >
              {session ? 'Publish a release' : 'Start distributing'}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/25 bg-transparent px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
            >
              Talk to our team
            </Link>
          </div>
        </div>

        <div className="grid gap-12 pb-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--slot4-accent)] text-sm font-extrabold text-black">
               <img src="/favicon.ico" alt="PressyIQ Logo" className="h-9 w-9" />
              </span>
              <span className="editorial-brand text-2xl font-extrabold tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
            <form action="/signup" className="mt-7 flex max-w-sm overflow-hidden rounded-full border border-white/15 bg-white/[0.04] p-1">
              <input
                name="email"
                type="email"
                placeholder="Your work email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-black">
                Subscribe
              </button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">{column.title}</h3>
              <ul className="mt-5 grid gap-3.5">
                {column.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">Account</h3>
            <ul className="mt-5 grid gap-3.5">
              {session ? (
                <>
                  <li>
                    <Link href="/create" className="text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                      Publish
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-left text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                      Get started
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/contact" className="text-sm text-white/70 transition-colors hover:text-[var(--slot4-accent)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark — Olioxy signature */}
        <div className="border-t border-white/10 pt-10">
          <p className="slot4-hero-display select-none text-[18vw] leading-[0.8] tracking-[-0.02em] text-white/90 lg:text-[16rem]">
            {SITE_CONFIG.name}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{globalContent.footer?.bottomNote}</p>
        </div>
      </div>
    </footer>
  )
}
