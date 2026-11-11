import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BLOGS, type BlogCategory, type BlogPost } from '@/data/blogs'
import { Link } from '@/navigation/RouterContext'
import { profile } from '@/data/profile'

type FilterCategory = 'All' | BlogCategory

const CATEGORIES: readonly FilterCategory[] = ['All', ...new Set(BLOGS.map((blog) => blog.category))]
const CATEGORY_ICONS: Record<BlogCategory, LucideIcon> = {
  'Software Development': Code2,
  'Artificial Intelligence': BrainCircuit,
  'Personal Reflections': UsersRound,
}

function formatStepNumber(num: number): string {
  return String(Math.max(1, num)).padStart(2, '0')
}

function getVisibleCards(): number {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 768) return 2
  return 1
}

function BlogCard({
  blog,
  index,
}: {
  blog: BlogPost
  index: number
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const CategoryIcon = CATEGORY_ICONS[blog.category]

  return (
    <Link
      to={blog.path}
      aria-label={`Read article: ${blog.title}`}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple"
    >
      <Card
        style={{ animationDelay: `${index * 90}ms` }}
        className="blog-card-enter flex h-full flex-col gap-0 overflow-hidden rounded-2xl border-border bg-white p-0 py-0 shadow-sm transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-brand-purple/25 group-hover:shadow-card-hover"
      >
        <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-purple-soft">
          {imageFailed ? (
            <div
              aria-hidden="true"
              className="flex size-full items-center justify-center bg-linear-to-br from-brand-purple-soft via-white to-brand-yellow-soft"
            >
              <CategoryIcon className="size-12 text-brand-purple" strokeWidth={1.4} />
            </div>
          ) : (
            <img
              src={blog.imageUrl}
              alt={blog.imageAlt}
              loading="lazy"
              width={900}
              height={563}
              onError={() => setImageFailed(true)}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-brand-ink/35 via-transparent to-transparent opacity-70"
          />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-brand-ink/65 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md">
            <CategoryIcon aria-hidden="true" className="size-3.5" />
            {blog.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[10px] font-bold tracking-[0.14em] text-brand-purple uppercase">
            Journal entry
          </p>
          <h3 className="mt-2 font-serif text-xl leading-[1.25] font-semibold tracking-tight text-brand-ink sm:text-[1.35rem]">
            {blog.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {blog.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4 text-sm font-semibold text-brand-purple">
            <span>Read story</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function RecentBlogsSection() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All')
  const [isSeeAll, setIsSeeAll] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(getVisibleCards)

  const filteredBlogs =
    selectedCategory === 'All'
      ? BLOGS
      : BLOGS.filter((blog) => blog.category === selectedCategory)

  const updateVisibleCards = useCallback(() => {
    setVisibleCards(getVisibleCards())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [updateVisibleCards])

  const maxStartIndex = Math.max(0, filteredBlogs.length - visibleCards)
  const totalSteps = maxStartIndex + 1
  const clampedIndex = Math.min(currentIndex, maxStartIndex)

  const scrollToStep = useCallback(
    (targetIndex: number) => {
      const container = scrollContainerRef.current
      if (!container || isSeeAll) return

      const nextIndex = Math.max(0, Math.min(targetIndex, maxStartIndex))
      const cards = container.querySelectorAll<HTMLElement>('[data-carousel-item]')
      const targetCard = cards[nextIndex]

      if (targetCard) {
        container.scrollTo({
          left: targetCard.offsetLeft,
          behavior: 'smooth',
        })
      }
      setCurrentIndex(nextIndex)
    },
    [isSeeAll, maxStartIndex],
  )

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container || isSeeAll) return

    const cards = container.querySelectorAll<HTMLElement>('[data-carousel-item]')
    if (cards.length === 0) return

    const scrollLeft = container.scrollLeft
    let closestIndex = 0
    let minDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setCurrentIndex(Math.min(closestIndex, maxStartIndex))
  }

  const handleCategoryChange = (category: FilterCategory) => {
    setSelectedCategory(category)
    setCurrentIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const canScrollPrev = !isSeeAll && clampedIndex > 0
  const canScrollNext = !isSeeAll && clampedIndex < maxStartIndex

  return (
    <section className="border-t border-border py-14 sm:py-20">
      {/* Section Header & Controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block size-2 rounded-full bg-brand-yellow"
            />
            <span className="text-[10px] font-bold tracking-[0.14em] text-brand-purple uppercase">
              {profile.siteName} archive
            </span>
          </div>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">
            Stories from my journey
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills */}
          <div
            role="group"
            aria-label="Filter blogs by category"
            className="flex max-w-full flex-wrap items-center gap-1 rounded-2xl border border-border bg-white p-1.5 shadow-sm sm:rounded-full"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category
              return (
                <Button
                  key={category}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isSelected}
                  className={`h-8 rounded-full px-3 text-[11px] font-medium sm:px-3.5 sm:text-xs ${
                    isSelected
                      ? 'bg-brand-purple text-white shadow-sm hover:bg-brand-purple-hover'
                      : 'text-muted-foreground hover:bg-brand-purple-soft hover:text-brand-purple'
                  }`}
                >
                  {category}
                </Button>
              )
            })}
          </div>

          {/* See All / See Less Buttons */}
          {!isSeeAll ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSeeAll(true)}
              className="h-8 rounded-full border-border bg-white px-4 text-xs font-semibold text-brand-purple shadow-sm hover:border-brand-purple hover:bg-brand-purple-soft focus-visible:ring-brand-purple"
            >
              See All
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSeeAll(false)}
              className="h-8 rounded-full border-border bg-white px-4 text-xs font-semibold text-brand-purple shadow-sm hover:border-brand-purple hover:bg-brand-purple-soft focus-visible:ring-brand-purple"
            >
              See Less
            </Button>
          )}

          {/* Step Counter & Back / Front Scroll Buttons */}
          <div className="flex items-center gap-2">
            <span className="px-1 font-mono text-[11px] font-medium tracking-wider text-muted-foreground">
              {isSeeAll
                ? `${formatStepNumber(filteredBlogs.length)} / ${formatStepNumber(filteredBlogs.length)}`
                : `${formatStepNumber(clampedIndex + 1)} / ${formatStepNumber(totalSteps)}`}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={!canScrollPrev}
              onClick={() => scrollToStep(clampedIndex - 1)}
              aria-label="Scroll to previous blog"
              className="size-9 rounded-full border-border bg-white text-brand-purple shadow-sm transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-ink focus-visible:ring-brand-purple disabled:opacity-40"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={!canScrollNext}
              onClick={() => scrollToStep(clampedIndex + 1)}
              aria-label="Scroll to next blog"
              className="size-9 rounded-full border-border bg-white text-brand-purple shadow-sm transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-ink focus-visible:ring-brand-purple disabled:opacity-40"
            >
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Blogs Display: Horizontal Carousel (when See All is inactive) vs Expanded Grid (when See All is active) */}
      {isSeeAll ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {filteredBlogs.map((blog, index) => (
            <div
              key={blog.id}
              data-carousel-item
              className="w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <BlogCard
                blog={blog}
                index={index}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
