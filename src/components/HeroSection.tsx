import {PhoneIcon} from 'lucide-react'
import heroImg from '@/assets/jazirah.png'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {EnvelopeSimpleIcon, LinkedinLogoIcon, WhatsappLogoIcon, XLogoIcon} from "@phosphor-icons/react"

const AUTHOR_EMAIL = 'assubbi@techreport.journal'
const AUTHOR_PHONE = '+256 712 345 678'
const AUTHOR_WHATSAPP = '+256 798 765 432'
const AUTHOR_LINKEDIN = 'annessubbi'
const AUTHOR_X_HANDLE = '@ssubbianne'

function sanitizePhoneNumber(phone: string, keepPlus = false): string {
  return keepPlus ? phone.replace(/[^\d+]/g, '') : phone.replace(/\D/g, '')
}

function openExternalUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function HeroSection() {
  const handleOpenEmail = () => {
    window.location.href = `mailto:${AUTHOR_EMAIL}`
  }

  const handleOpenPhone = () => {
    const formattedPhone = sanitizePhoneNumber(AUTHOR_PHONE, true)
    window.location.href = `tel:${formattedPhone}`
  }

  const handleOpenWhatsApp = () => {
    const whatsappDigits = sanitizePhoneNumber(AUTHOR_WHATSAPP, false)
    openExternalUrl(`https://wa.me/${whatsappDigits}`)
  }

  const handleOpenLinkedIn = () => {
    openExternalUrl(`https://www.linkedin.com/in/${AUTHOR_LINKEDIN}`)
  }

  const handleOpenX = () => {
    const cleanHandle = AUTHOR_X_HANDLE.replace(/^@/, '')
    openExternalUrl(`https://x.com/${cleanHandle}`)
  }

  return (
    <section className="py-4 sm:py-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Portrait Card & Author Attribution (First on mobile, left on desktop) */}
        <figure className="lg:col-span-5">
          <Card className="relative aspect-4/5 w-full overflow-hidden rounded-xl border-border bg-card p-0 py-0 shadow-xs">
            <span
              aria-hidden="true"
              className="absolute top-3.5 left-3.5 z-10 h-1.5 w-4 rounded-full bg-background/90 shadow-2xs"
            />

            <img
              src={heroImg}
              alt="Anne Ssubbi, Systems Architect and Founder of The Tech Report"
              fetchPriority="high"
              width={680}
              height={716}
              className="size-full object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-linear-to-t from-background/85 via-background/35 to-transparent p-3.5 pt-14"
            >
              <div className="h-2.5 w-full rounded-xs bg-background/95 shadow-2xs" />
            </div>
          </Card>

          <figcaption className="mt-3.5 space-y-0.5">
            <p className="text-xs font-semibold text-foreground">Anne Ssubbi</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Systems Architect &amp; Independent Essayist. Founder of The Tech Report
            </p>
          </figcaption>
        </figure>

        {/* Right Column: Authorial Focus & Direct Inquiries (Below image on mobile, right on desktop) */}
        <div className="flex flex-col lg:col-span-7 lg:pt-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#9a5b42] uppercase">
              Authorial Focus
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-border" />
          </div>

          <h1 className="mt-3 font-serif text-3xl leading-[1.14] font-normal tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
            Writing at the intersection of{' '}
            <em className="font-normal italic">quiet computing</em>, spatial
            architecture, and enduring software.
          </h1>

          <p className="mt-5 text-[14.5px] leading-[1.7] text-foreground/80">
            Over the last fifteen years, I have drafted distributed fault-tolerant
            topologies by day and examined the subtle erosion of cognitive silence by
            night. The Tech Report is an archival venue for unhurried
            prose&mdash;deliberate investigations into digital ergonomics,
            high-leverage simplicity, and technologies built to outlast market frenzy.
          </p>

          <p className="mt-4 text-xs leading-[1.7] text-muted-foreground sm:text-[13px]">
            Every piece published here undergoes iterative revisions, typographic
            tuning, and empirical review. Supported solely through independent
            patronage and direct subscriber micro-patronage. No algorithms, no ad
            tracking, no performative urgency.
          </p>

          <div className="mt-7 pt-1">
            <h2 className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Direct Inquiries &amp; Corroboration
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleOpenEmail}
                className="h-8 gap-2 rounded-md border border-border/80 bg-card px-3 text-xs font-normal text-foreground hover:bg-secondary"
              >
                <EnvelopeSimpleIcon size={32} className="text-muted-foreground"/>
                <span>{AUTHOR_EMAIL}</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleOpenPhone}
                className="h-8 gap-2 rounded-md border border-border/80 bg-card px-3 text-xs font-normal text-foreground hover:bg-secondary"
              >
                <PhoneIcon size={32} className="text-muted-foreground"/>
                <span>{AUTHOR_PHONE}</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleOpenWhatsApp}
                className="h-8 gap-2 rounded-md border border-border/80 bg-card px-3 text-xs font-normal text-foreground hover:bg-secondary"
              >
                <WhatsappLogoIcon size={32} className="text-muted-foreground"/>
                <span>{AUTHOR_WHATSAPP}</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleOpenLinkedIn}
                className="h-8 gap-2 rounded-md border border-border/80 bg-card px-3 text-xs font-normal text-foreground hover:bg-secondary"
              >
                <LinkedinLogoIcon size={32} className="text-muted-foreground"/>
                <span>{AUTHOR_LINKEDIN}</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleOpenX}
                className="h-8 gap-2 rounded-md border border-border/80 bg-card px-3 text-xs font-normal text-foreground hover:bg-secondary"
              >
                <XLogoIcon size={32} className="text-muted-foreground" />
                <span>{AUTHOR_X_HANDLE}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
