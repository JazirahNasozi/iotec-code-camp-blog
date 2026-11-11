import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, BrainCircuit, Code2, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'
import { BLOGS, type BlogCategory } from '@/data/blogs'
import { profile } from '@/data/profile'

const CATEGORY_ICONS: Record<BlogCategory, typeof Code2> = {
  'Software Development': Code2,
  'Artificial Intelligence': BrainCircuit,
  'Personal Reflections': UsersRound,
}

export function BlogDetailsPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const blog = BLOGS.find((post) => post.path === pathname)
    ?? (pathname === PATHS.BLOG_DETAILS ? BLOGS[0] : undefined)
  const [failedImagePath, setFailedImagePath] = useState<string | null>(null)

  if (!blog) {
    return (
      <div className="flex flex-1 flex-col items-start py-12">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigate(PATHS.LANDING)}
          className="rounded-full px-4 text-xs font-medium"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          <span>Back to journal</span>
        </Button>
        <p className="mt-10 text-sm text-muted-foreground">This story could not be found.</p>
      </div>
    )
  }

  const CategoryIcon = CATEGORY_ICONS[blog.category]
  const imageFailed = failedImagePath === blog.path

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start py-10 sm:py-14">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => navigate(PATHS.LANDING)}
        className="rounded-full border-border bg-white px-4 text-xs font-semibold text-brand-purple shadow-sm hover:bg-brand-purple-soft focus-visible:ring-brand-purple"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        <span>Back to journal</span>
      </Button>

      <header className="mt-10 w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-brand-purple-soft px-3 py-1.5 text-xs font-semibold text-brand-purple">
          <CategoryIcon aria-hidden="true" className="size-4" />
          {blog.category}
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.16em] text-brand-purple uppercase">
          A story from {profile.siteName}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
          {blog.title}
        </h1>
      </header>

      <div className="mt-8 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border bg-brand-purple-soft shadow-card">
        {imageFailed ? (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center bg-linear-to-br from-brand-purple-soft via-white to-brand-yellow-soft"
          >
            <CategoryIcon className="size-16 text-brand-purple" strokeWidth={1.3} />
          </div>
        ) : (
          <img
            src={blog.imageUrl}
            alt={blog.imageAlt}
            onError={() => setFailedImagePath(blog.path)}
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="mt-9 w-full border-l-4 border-brand-yellow pl-5 sm:pl-7">
        <p className="text-[11px] font-bold tracking-[0.14em] text-brand-purple uppercase">
          Article excerpt
        </p>
        <p className="mt-3 font-serif text-xl leading-relaxed text-brand-ink sm:text-2xl">
          {blog.excerpt}
        </p>
      </div>

      <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Written by <span className="font-semibold text-brand-ink">{profile.fullName}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigate(PATHS.LANDING)}
          className="rounded-full border-brand-purple/25 bg-white px-4 text-xs font-semibold text-brand-purple hover:bg-brand-purple-soft focus-visible:ring-brand-purple"
        >
          <span>Explore more stories</span>
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Button>
      </div>
    </article>
  )
}
