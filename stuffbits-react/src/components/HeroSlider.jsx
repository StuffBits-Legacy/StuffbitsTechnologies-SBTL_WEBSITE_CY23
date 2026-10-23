import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HERO = {
  tagline: 'Embedded Technology',
  title: 'Electronics engineered',
  titleAccent: 'for the real world.',
  subtitle:
    'Hardware, firmware, and PCB design for automotive, industrial, and connected products — from the first prototype to production.',
  cta: 'Get a Free Consultation',
  ctaLink: '/contact',
  ctaSecondary: 'View Our Work',
  ctaSecondaryLink: '/portfolio',
  video: '/videos/embedded-iot-hero.mp4',
}

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1], delay },
  }),
}

export default function HeroSlider() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy -mt-14">
      <div className="absolute inset-0">
        <video
          src={HERO.video}
          className="h-full w-full object-cover object-center"
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/45 to-navy/10"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/50 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center pt-20">
        <div className="max-w-container mx-auto w-full px-8 md:px-10 lg:pl-16">
          <div className="max-w-xl">
            <motion.p
              className="sb-kicker mb-4"
              initial="hidden"
              animate="show"
              variants={reveal}
              custom={0.05}
            >
              {HERO.tagline}
            </motion.p>
            <motion.h1
              className="font-heading text-4xl font-medium leading-[1.08] text-white md:text-5xl lg:text-6xl"
              initial="hidden"
              animate="show"
              variants={reveal}
              custom={0.15}
            >
              {HERO.title}
              <span className="mt-1 block text-gold">{HERO.titleAccent}</span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 md:text-lg"
              initial="hidden"
              animate="show"
              variants={reveal}
              custom={0.3}
            >
              {HERO.subtitle}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial="hidden"
              animate="show"
              variants={reveal}
              custom={0.45}
            >
              <Link to={HERO.ctaLink} className="sb-btn-primary">
                {HERO.cta}
              </Link>
              <Link
                to={HERO.ctaSecondaryLink}
                className="sb-btn border-2 border-white/80 px-7 py-3 text-white hover:border-gold hover:bg-gold hover:text-navy"
              >
                {HERO.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
