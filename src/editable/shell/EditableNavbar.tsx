'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navLinks = globalContent.nav.primaryLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`bg-[var(--slot4-dark-bg)] text-white transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : 'border-b border-white/5'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/favicon.ico" alt="PressyIQ Logo" className="h-10 w-10" />
            <span className="editorial-brand max-w-[42vw] truncate text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="slot4-navlink text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              aria-label="Search"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:grid"
            >
              <Search className="h-4 w-4" />
            </Link>
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block"
              >
                Log in
              </Link>
            )}
            <Link
              href={session ? '/create' : '/signup'}
              className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:px-5"
            >
              {session ? 'Publish' : 'Get started'}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-b border-white/10 bg-[var(--slot4-dark-bg)] px-5 py-5 lg:hidden">
          <div className="grid gap-1.5">
            {[
              { label: 'Home', href: '/' },
              ...navLinks,
              { label: 'Search', href: '/search' },
              ...(session
                ? [{ label: 'Publish', href: '/create' }]
                : [
                    { label: 'Log in', href: '/login' },
                    { label: 'Get started', href: '/signup' },
                  ]),
            ].map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
