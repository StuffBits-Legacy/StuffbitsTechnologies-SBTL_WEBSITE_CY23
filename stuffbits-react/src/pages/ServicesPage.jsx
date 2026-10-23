import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Workflow,
  Zap,
} from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import TechStackByService from '../components/home/TechStackByService'
import {
  EmbeddedFirmwareIcon,
  EmbeddedHardwareIcon,
  ProductionIcon,
  SoftwareDevelopmentIcon,
} from '../components/icons/ServiceIcons'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const HIGHLIGHTS = [
  {
    icon: Workflow,
    kicker: 'Turnkey Pipeline',
    title: 'Schematic to Volume',
    description: 'End-to-end multi-layer design, DFM analysis, and pilot build governance.',
  },
  {
    icon: ShieldCheck,
    kicker: 'Safety Standards',
    title: 'Automotive & Industrial',
    description: 'Rigorous MISRA-C, AUTOSAR, and deterministic RTOS kernel architectures.',
  },
  {
    icon: Zap,
    kicker: 'Fast Turnaround',
    title: 'In-House Prototyping',
    description: 'Rapid functional testing, bench bring-up, and environmental validation.',
  },
  {
    icon: Lock,
    kicker: 'Confidentiality',
    title: '100% IP Protection',
    description: 'Strict NDA adherence, secure isolated repo nodes, and full source code transfer.',
  },
]

const DISCIPLINES = [
  {
    code: 'MOD_01 // HW',
    title: 'Embedded Hardware and PCB Design',
    description:
      'Electronic hardware development, circuit design and PCB engineering for application-specific products. From component selection and schematic capture to high-speed multi-layer routing, signal integrity simulation, and DFM.',
    deliverables: [
      'Custom Schematic Design',
      'High-Speed & Multi-Layer PCB',
      'Signal & Power Integrity',
      'DFM & Thermal Analysis',
    ],
    href: '/services/embedded-hardware',
    cta: 'Explore Hardware Engineering',
    icon: EmbeddedHardwareIcon,
  },
  {
    code: 'MOD_02 // FW',
    title: 'Embedded Firmware',
    description:
      'Embedded software and firmware development for reliable device operation, control and connectivity. Real-time firmware development across bare-metal, RTOS, and AUTOSAR stacks with rigorous MISRA-C and safety-critical compliance.',
    deliverables: [
      'Bare-metal & RTOS Architecture',
      'AUTOSAR & Device Drivers',
      'MISRA-C Compliance',
      'CAN, LIN, SPI & I2C Protocols',
    ],
    href: '/services/embedded-firmware',
    cta: 'Explore Firmware',
    icon: EmbeddedFirmwareIcon,
  },
  {
    code: 'MOD_03 // PROD',
    title: 'Production and Prototyping',
    description:
      'Prototype development, engineering validation and production support for product development workflows. Turnkey assembly, functional testing, environmental stress testing, and transition to volume manufacturing.',
    deliverables: [
      'Rapid PCBA Prototyping',
      'Functional & Bench Testing',
      'DFM / DFA Optimization',
      'Supply Chain & BOM Management',
    ],
    href: '/services/component-assembly',
    cta: 'Explore Prototyping',
    icon: ProductionIcon,
  },
  {
    code: 'MOD_04 // SW',
    title: 'Software Development',
    description:
      'Software engineering and application development supporting connected products and business requirements. Cloud backends, real-time telemetry dashboards, desktop engineering tools, and companion mobile applications.',
    deliverables: [
      'IoT Cloud Telemetry & Backends',
      'Industrial Diagnostics Dashboards',
      'Cross-Platform Mobile Apps',
      'Hardware Interface APIs',
    ],
    href: '/services/it-development',
    cta: 'Explore Software Development',
    icon: SoftwareDevelopmentIcon,
  },
]

const WORKFLOW = [
  {
    step: '01',
    title: 'Understand',
    description:
      'Requirements, constraints and application needs. We analyse environmental conditions, power budgets, thermal limitations, and regulatory standards to establish a robust architectural foundation before writing a single line of code or laying a trace.',
  },
  {
    step: '02',
    title: 'Engineer',
    description:
      'Design, development and technical validation. Iterative schematic design, PCB layout routing, low-level firmware coding, and continuous bench testing to identify and de-risk signal integrity, thermal, or protocol issues early.',
  },
  {
    step: '03',
    title: 'Deliver',
    description:
      'Practical implementation and project handover. Complete production documentation (Gerber files, IPC-compliant BOM, test jigs, firmware binaries), validation reports, and ongoing support for manufacturing ramp-up.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        kicker="Engineering Capabilities"
        title="Engineering solutions"
        titleAccent="built to perform."
        subtitle="Hardware, firmware, production, and the software around a connected product — designed for the environment it has to survive."
        image="/images/services/pcb-layout.png"
        imageAlt=""
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
        actions={
          <>
            <Link to="/contact" className="sb-btn-primary">
              Discuss Your Project <ArrowRight size={18} />
            </Link>
            <a
              href="#disciplines"
              className="sb-btn border-2 border-white/80 px-7 py-3 text-white hover:border-gold hover:bg-gold hover:text-navy"
            >
              Explore Capabilities <ArrowDown size={18} />
            </a>
          </>
        }
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-container gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
            {HIGHLIGHTS.map(({ icon, kicker, title, description }) => {
              const HighlightIcon = icon
              return (
              <div key={kicker} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <p className="sb-kicker flex items-center gap-2">
                  <HighlightIcon size={15} aria-hidden />
                  {kicker}
                </p>
                <h2 className="mt-3 font-heading text-lg font-semibold text-navy">{title}</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
              )
            })}
        </div>
      </section>

      <section id="disciplines" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-container px-6">
          <Motion.div {...fadeUp} className="mb-12 max-w-2xl">
            <p className="sb-kicker mb-3">Core Disciplines</p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">Engineering Services</h2>
            <p className="sb-lead">
              Practical engineering expertise across hardware, firmware, production and software
              designed for mission-critical operations.
            </p>
          </Motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {DISCIPLINES.map(({ code, title, description, deliverables, href, cta, icon }, i) => {
              const DisciplineIcon = icon
              return (
              <Motion.article
                key={code}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex h-full flex-col border border-slate-200 bg-white p-6 transition-colors hover:border-gold md:p-7"
              >
                <div className="mb-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 text-navy">
                    <DisciplineIcon size={20} />
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-slate-600">{description}</p>
                <p className="sb-kicker mb-3 mt-6">
                  Key Deliverables
                </p>
                <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 font-body text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  {cta} <ArrowRight size={15} />
                </Link>
              </Motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <TechStackByService />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-container px-6">
          <Motion.div {...fadeUp} className="mb-12 max-w-3xl">
            <p className="sb-kicker mb-3">Engineering Workflow</p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">From Engineering Requirements to Working Solutions</h2>
            <p className="sb-lead">
              A disciplined, methodical engineering workflow tailored for mission-critical embedded
              systems and hardware deployment.
            </p>
          </Motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Motion.figure {...fadeUp} className="relative overflow-hidden border border-slate-200">
              <img
                src="/images/services/component-assembly.png"
                alt="Engineer validating a board on the production line"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute inset-x-3 bottom-3 bg-white/95 px-4 py-3">
                <p className="flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-navy">
                  <span className="h-1.5 w-1.5 bg-emerald-500" aria-hidden />
                  Bench-Verified Prototype Flow
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-slate-600">
                  Bench-level functional testing and signal integrity testing under simulated operating
                  conditions.
                </p>
              </figcaption>
            </Motion.figure>

            <ol className="space-y-8">
              {WORKFLOW.map(({ step, title, description }, i) => (
                <Motion.li
                  key={step}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2"
                >
                  <span className="font-heading text-2xl font-bold leading-none text-gold">{step}</span>
                  <h3 className="font-heading text-xl font-bold leading-none text-navy">{title}</h3>
                  <p className="col-start-2 font-body text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
                </Motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Motion.div {...fadeUp}>
            <p className="sb-kicker mb-5 inline-flex border border-gold/40 bg-gold/10 px-3 py-1">
              Ready for Implementation
            </p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Ready to Start Your Engineering Project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-slate-300">
              Tell us about your requirements and let&apos;s explore the right engineering approach for
              your hardware, firmware, or full-stack device.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="sb-btn-primary">
                Discuss Your Project <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="sb-btn border border-white/30 px-7 py-3 text-white hover:border-gold hover:text-gold"
              >
                Contact Us <MessageSquare size={16} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-body text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-gold" aria-hidden />
                Pune, India
              </span>
              <a href="mailto:contact@stuffbits.in" className="inline-flex items-center gap-2 hover:text-gold">
                <Mail size={15} className="text-gold" aria-hidden />
                contact@stuffbits.in
              </a>
              <a href="tel:+919860999078" className="inline-flex items-center gap-2 hover:text-gold">
                <Phone size={15} className="text-gold" aria-hidden />
                +91 9860999078
              </a>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}
