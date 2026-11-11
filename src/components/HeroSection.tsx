import { useState } from 'react'
import { EnvelopeSimpleIcon, LinkedinLogoIcon, WhatsappLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { PhoneIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { profile } from '@/data/profile'

export function HeroSection() {
  const [photoFailed, setPhotoFailed] = useState(false)

  const contacts = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: EnvelopeSimpleIcon,
    },
    {
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`,
      icon: PhoneIcon,
    },
    {
      label: 'WhatsApp',
      value: profile.whatsapp,
      href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`,
      icon: WhatsappLogoIcon,
      external: true,
    },
    {
      label: 'LinkedIn',
      value: profile.linkedInHandle,
      href: profile.linkedInUrl,
      icon: LinkedinLogoIcon,
      external: true,
    },
    {
      label: 'X',
      value: profile.xHandle,
      href: profile.xUrl,
      icon: XLogoIcon,
      external: true,
    },
  ].filter(({ value }) => {
    const trimmedValue = value.trim()
    return trimmedValue !== '' && !/^YOUR_[A-Z0-9_]+$/i.test(trimmedValue)
  })

  return (
    <section className="hero-glow relative isolate py-8 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <figure className="animate-fade-up relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rotate-3 rounded-[2rem] bg-brand-yellow/75"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 -rotate-2 rounded-[1.75rem] border-2 border-brand-purple/25"
          />
          <Card className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-border bg-card p-0 shadow-card">
            {photoFailed ? (
              <div
                aria-hidden="true"
                className="flex size-full items-center justify-center bg-linear-to-br from-brand-purple-soft via-white to-brand-yellow-soft font-serif text-7xl font-semibold text-brand-purple"
              >
                {profile.initials}
              </div>
            ) : (
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.fullName}`}
                fetchPriority="high"
                width={680}
                height={850}
                onError={() => setPhotoFailed(true)}
                className="size-full object-cover object-[center_30%]"
              />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-brand-ink/35 to-transparent"
            />
          </Card>

          <div className="absolute right-0 top-7 z-10 rounded-full border-2 border-white bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-amber-ink shadow-card sm:-right-5">
            {profile.role}
          </div>

          <figcaption className="mt-5 space-y-1 text-center lg:text-left">
            <p className="font-serif text-lg font-semibold tracking-tight text-brand-ink">
              {profile.fullName}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{profile.role}</p>
          </figcaption>
        </figure>

        <div className="animate-fade-up flex flex-col lg:col-span-7 lg:py-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.16em] text-brand-purple uppercase">
              {profile.heroEyebrow}
            </span>
            <span aria-hidden="true" className="h-1 w-10 rounded-full bg-brand-yellow" />
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] font-medium tracking-tight text-brand-ink sm:text-5xl lg:text-[3.5rem]">
            {profile.headlinePrefix}{' '}
            <span className="highlight-marker">{profile.headlineHighlight}</span>
            {profile.headlineSuffix}
          </h1>

          {profile.biography.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-sm leading-[1.8] text-foreground/85 sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}

          {contacts.length > 0 && (
            <div className="mt-8 pt-1">
              <h2 className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                Connect with me
              </h2>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {contacts.map(({ label, value, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${label}: ${value}`}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-purple/25 bg-white px-3.5 py-2 text-xs font-medium text-brand-ink shadow-sm transition-all hover:border-brand-purple hover:bg-brand-purple hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    <span>{value}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
