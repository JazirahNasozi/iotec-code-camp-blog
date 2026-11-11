import { Link } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'
import { profile } from '@/data/profile'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          to={PATHS.LANDING}
          className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple font-serif text-xs font-semibold tracking-wider text-primary-foreground shadow-sm transition-transform group-hover:scale-105"
          >
            {profile.initials}
            <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-brand-yellow" />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-base leading-tight font-semibold tracking-tight text-brand-ink sm:text-lg">
              {profile.siteName}
            </span>
            <span className="mt-1 text-[11px] leading-tight text-muted-foreground">
              {profile.tagline}
            </span>
          </span>
        </Link>
      </div>
    </header>
  )
}
