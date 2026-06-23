import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  const signup = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main className={`${dc.shell.page} ${dc.shell.section} py-12 sm:py-16 lg:py-20`}>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[var(--slot4-line)] shadow-[0_28px_70px_rgba(12,12,12,0.14)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* Form side */}
          <div className="flex flex-col justify-center bg-white p-7 sm:p-12 lg:p-14">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-page-text)]">
              <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" /> Create account
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.02em]">{signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 border-t border-[var(--slot4-line)] pt-5 text-sm text-[var(--slot4-muted-text)]">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[var(--slot4-page-text)] underline decoration-[var(--slot4-accent)] decoration-[3px] underline-offset-4">
                {signup.loginCta}
              </Link>
            </p>
          </div>

          {/* Brand side */}
          <div className="relative flex flex-col justify-center overflow-hidden [background:var(--slot4-hero-bg)] p-8 text-white sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute -left-16 -bottom-12 h-60 w-60 rounded-full bg-[var(--slot4-accent)]/18 blur-[80px]" />
            <p className="relative flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
              <span className="h-3 w-3 rounded-sm bg-[var(--slot4-accent)]" />
              {signup.badge}
            </p>
            <h2 className="slot4-hero-display relative mt-5 max-w-md text-4xl uppercase leading-[0.96] sm:text-6xl">{signup.title}</h2>
            <p className="relative mt-6 max-w-md text-base leading-8 text-white/65">{signup.description}</p>
          </div>
        </div>
      </main>
    </EditableSiteShell>
  )
}
