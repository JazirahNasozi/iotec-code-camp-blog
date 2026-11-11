import { ArrowRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'
import { profile } from '@/data/profile'

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="mt-auto w-full bg-brand-ink text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple font-serif text-xs font-semibold tracking-wider text-white"
            >
              {profile.initials}
              <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-brand-ink bg-brand-yellow" />
            </span>
            <div>
              <p className="font-serif text-lg leading-tight font-semibold tracking-tight text-white">
                {profile.siteName}
              </p>
              <p className="mt-1 text-xs text-white/75">
                {profile.tagline}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(PATHS.ADMIN_BLOGS)}
            className="self-start rounded-full border-white/50 bg-transparent px-4 py-2 text-xs font-semibold text-white shadow-none transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-ink focus-visible:ring-brand-yellow sm:self-auto"
          >
            <Lock aria-hidden="true" className="size-3.5" />
            <span>Admin Portal</span>
            <ArrowRight aria-hidden="true" className="size-3" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 py-4 text-[11px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {profile.siteName}. All rights reserved.</p>
          <p>{profile.fullName}</p>
        </div>
      </div>
    </footer>
  )
}
