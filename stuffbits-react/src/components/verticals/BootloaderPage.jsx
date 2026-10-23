import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu,
  Layers,
  LockKeyhole,
  MessageCircle,
  MonitorCog,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

const SERVICES = [
  {
    icon: MonitorCog,
    title: 'Hardware Platform Consulting for Bootloader Development',
    points: [
      'Requirement gathering and application analysis workshops with our automotive engineers',
      'Hardware platform evaluation and a project roadmap',
      'Flash bootloader software for 8-bit, 16-bit, and 32-bit microcontrollers, matched to the project',
      {
        text: 'Platform experience:',
        children: ['ARM bootloader', 'AVR bootloader', 'STM32 bootloader', 'Infineon bootloader'],
      },
    ],
  },
  {
    icon: Layers,
    title: 'In-vehicle Communication and Application Layer Services',
    points: [
      'ECU flashing over CAN FD, CAN, LIN, UART, SPI, I2C, and Ethernet',
      {
        text: 'Application protocols:',
        highlight: 'UDS on CAN, UDS on IP (DoIP), J1939, KWP2000, and J1587',
      },
      'Custom bootloaders for ECU flashing over a proprietary protocol when the vehicle network requires it',
    ],
  },
  {
    icon: Wrench,
    title: 'ECU Reprogramming Tools and End-of-Line Testing',
    points: [
      'Custom ECU flashing tools for PC and web',
      'GUI tools and command-line tools for end-of-line programming',
      'Configuration and testing with standard tools such as PCAN, vFlash, and ValueCAN',
      'ECU programming support using vFlash',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Secure Flash Bootloader Access and Data Integrity',
    points: [
      'Seed-and-key so only an authorized tester can open a programming session',
      'Checksum strategy, including CRC-16, so the image is verified before the ECU accepts it',
    ],
  },
  {
    icon: Cpu,
    title: 'Flash Bootloader Development Services',
    points: [
      'Programming sequence built to the project: jump to boot, erase, download, validate, and reset',
      'Memory map between the bootloader and the ECU application',
      'CAPL or bus-master scripts that drive the reprogramming session',
      'Base software — flash driver, MCU startup, and timers — aligned with the bootloader design',
      'Integration on the customer hardware platform',
    ],
  },
  {
    icon: LockKeyhole,
    title: 'Secure Boot for Automotive ECU Reprogramming',
    points: [
      'Hardware security module integration, following the microcontroller security features, and connection to the flash bootloader',
      'Encryption and decryption of flashing files',
      'Protection against unintended reads and writes in the bootloader',
      'Digital signatures for logical blocks',
      'Compression and decompression so large images download faster',
    ],
  },
]

const FACTSHEET = [
  'Overview of a stable flash bootloader for ECU reprogramming',
  'Solution kit: scripts and tools, plus primary and secondary bootloaders',
  'Features and memory requirements',
  'Services for development, testing, and maintenance',
  'Compatibility with vehicle communication protocols',
  'A programming sequence that can be adapted to the target ECU',
]

const UDS_SERVICES = [
  'Diagnostic Session Control',
  'ECU Reset',
  'Routine Control (flash erase and application validation)',
  'Request Download',
  'Transfer Data',
  'Transfer Exit',
  'Clear DTC',
]

const J1939_LAYERS = [
  'J1939/21 — datalink and transport protocol',
  'J1939/81 — network management',
  'J1939/71 — application layer',
  'J1939/73 — diagnostic layer (DM3, DM11, DM14, DM15, and DM16)',
]

const accent = '#e37b1a'

function QueryButton() {
  return (
    <Link
      to="/contact"
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-95"
      style={{ backgroundColor: accent }}
    >
      <MessageCircle size={16} />
      Send us your Queries
    </Link>
  )
}

function PointList({ points }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
      {points.map((point) => {
        const item = typeof point === 'string' ? { text: point } : point
        return (
          <li key={item.text}>
            <div className="flex gap-2.5">
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-slate-700" />
              <span>
                {item.text}
                {item.highlight && (
                  <span className="font-semibold" style={{ color: accent }}>
                    {' '}
                    {item.highlight}
                  </span>
                )}
              </span>
            </div>
            {item.children && (
              <ul className="ml-4 mt-2 space-y-1.5">
                {item.children.map((child) => (
                  <li key={child} className="flex gap-2.5">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-slate-700" />
                    <span>{child}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function LayerStack({ layers }) {
  return (
    <div className="overflow-hidden border border-slate-200 text-center text-[11px] font-semibold leading-snug text-white">
      {layers.map((layer) => (
        <div key={layer.label} className={`border-b border-white/25 px-3 py-2.5 last:border-b-0 ${layer.tone}`}>
          {layer.label}
        </div>
      ))}
    </div>
  )
}

function MemoryMap() {
  return (
    <div className="flex items-start gap-4 text-[11px]">
      <div className="w-40 shrink-0 border border-emerald-900/15 text-center font-semibold">
        <div className="flex h-20 items-center justify-center bg-emerald-400 px-2 text-emerald-950">
          Bootloader block
        </div>
        <div className="flex h-40 items-center justify-center bg-emerald-700 px-2 text-white">
          Application block
        </div>
      </div>
      <div className="w-28 text-slate-500">
        <p className="flex h-20 items-start pt-2">After reset</p>
        <p>Application start address</p>
      </div>
    </div>
  )
}

function BootFlow() {
  return (
    <div className="text-[11px] font-semibold leading-tight text-slate-700">
      <div className="w-36 border border-slate-300 bg-white px-2 py-2 text-center">Power on</div>
      <div className="ml-16 h-4 w-px bg-slate-300" />
      <div className="w-36 border border-emerald-700 bg-emerald-50 px-2 py-2 text-center text-emerald-900">
        Primary bootloader
      </div>
      <div className="ml-16 h-4 w-px bg-slate-300" />
      <div className="w-36 border border-slate-300 bg-white px-2 py-2 text-center">Application valid?</div>
      <div className="mt-2 grid w-44 grid-cols-2 gap-2 text-center">
        <div>
          <p className="text-[10px] font-medium text-emerald-700">Yes</p>
          <div className="mt-1 border border-emerald-700 bg-emerald-700 px-1 py-2 text-white">Application</div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-slate-500">No</p>
          <div className="mt-1 border border-slate-300 bg-slate-100 px-1 py-2">Stay in boot</div>
        </div>
      </div>
    </div>
  )
}

function FactsheetPreview() {
  const layers = ['Primary bootloader', 'Secondary bootloader', 'Flash driver', 'CAN / LIN / Ethernet']
  return (
    <article id="bootloader-factsheet" className="scroll-mt-24 border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3 px-3 py-2 text-white" style={{ backgroundColor: accent }}>
        <p className="text-[11px] font-semibold leading-tight">Flash Bootloader Solution | Fact sheet</p>
        <p className="shrink-0 text-[11px] font-semibold tracking-[0.14em]">STUFFBITS</p>
      </div>
      <div className="grid gap-4 p-4 text-[11px] leading-relaxed text-slate-600 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-navy">Memory requirements</p>
          <p className="mt-1">Low footprint for both ROM and RAM.</p>
          <p className="mt-2 font-semibold text-navy">ROM: 12 to 15 KB</p>
          <p className="font-semibold text-navy">RAM: 2 to 3 KB</p>
          <p className="mt-3 font-semibold text-navy">Compatible links</p>
          <ul className="mt-1 space-y-0.5">
            {['UART', 'SPI', 'CAN', 'LIN', 'Ethernet'].map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-navy">Overview</p>
          <p className="mt-1">
            Ready-to-deploy flash bootloader for UDS on CAN, UDS on IP, J1939, and KWP2000. The sequence
            is adapted per ECU and runs with RTOS and non-RTOS applications.
          </p>
          <div className="mt-3 space-y-1">
            {layers.map((layer, index) => (
              <div
                key={layer}
                className="px-2 py-1.5 text-center text-[10px] font-semibold text-white"
                style={{ backgroundColor: ['#1d4e89', '#2f6fad', '#3d8f86', '#245c74'][index] }}
              >
                {layer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function HeroBackdrop() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bootloaderHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a4f9c" />
          <stop offset="48%" stopColor="#163e86" />
          <stop offset="100%" stopColor="#0d2d66" />
        </linearGradient>
        <radialGradient id="bootloaderGlow" cx="72%" cy="42%" r="28%">
          <stop offset="0%" stopColor="#d7ebff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#8ebfff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8ebfff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="420" fill="url(#bootloaderHero)" />
      <rect width="1200" height="420" fill="url(#bootloaderGlow)" />
      <g fill="#ffffff" opacity="0.18">
        <rect x="70" y="250" width="16" height="90" />
        <rect x="98" y="210" width="16" height="130" />
        <rect x="126" y="170" width="16" height="170" />
        <rect x="154" y="230" width="16" height="110" />
      </g>
      <g fill="#d7e8ff" opacity="0.9">
        <polygon points="860,150 910,185 860,220" />
        <polygon points="930,150 980,185 930,220" />
        <polygon points="1000,150 1050,185 1000,220" />
        <polygon points="1070,150 1120,185 1070,220" />
      </g>
      <circle cx="820" cy="120" r="46" fill="#ffffff" opacity="0.16" />
      <circle cx="990" cy="300" r="70" fill="#9ec8ff" opacity="0.18" />
    </svg>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="mb-8 max-w-xl">
      <h2 className="font-heading text-2xl font-semibold leading-snug text-navy md:text-[1.7rem]">{children}</h2>
      <div className="mt-3 h-1.5 w-44 bg-[#3c2a6d] md:ml-24" />
    </div>
  )
}

function KnowledgeTitle({ index, children }) {
  return (
    <h2 className="flex items-center gap-4 font-heading text-2xl font-semibold text-navy md:text-[1.7rem]">
      <span className="text-5xl font-light leading-none text-[#e6d3c3] md:text-6xl">{index}</span>
      <span>{children}</span>
    </h2>
  )
}

export default function BootloaderPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Flash Bootloader | StuffBits Technologies'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="bg-[#fbf7f2]">
      <section id="bootloader" className="relative min-h-[280px] scroll-mt-14 overflow-hidden md:min-h-[340px]">
        <HeroBackdrop />
        <div className="relative mx-auto flex min-h-[280px] max-w-container items-center px-6 py-14 md:min-h-[340px] md:py-16">
          <h1 className="max-w-xl font-heading text-4xl font-semibold leading-[1.15] text-white md:text-5xl">
            Flash Bootloader Solutions for ECU Reprogramming
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-container px-6 text-center">
          <h2 className="mx-auto max-w-3xl font-heading text-2xl font-semibold text-navy md:text-[1.7rem]">
            Bootloader Software Solution for Automotive ECU
          </h2>
          <div className="mx-auto mt-5 max-w-5xl space-y-4 text-[15px] leading-relaxed text-slate-700">
            <p>
              Built by embedded software engineers, this stable, ready-to-deploy flash bootloader is
              meant for production ECUs. It keeps a low ROM and RAM footprint, and the programming
              sequence can be adapted to the target application.
            </p>
            <p>
              It is compatible with application-level protocols such as{' '}
              <strong>UDS on CAN, UDS on IP, J1939, and KWP2000</strong>, and it also supports{' '}
              <strong>CAN FD, CAN, and LIN</strong>.
            </p>
            <p>
              The same bootloader runs with both <strong>RTOS and non-RTOS</strong> applications, and
              it stays independent of the ECU application it updates.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <QueryButton />
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="mx-auto max-w-container px-6">
          <SectionTitle>
            Flash Bootloader Development and
            <br className="hidden sm:block" /> Integration Services:
          </SectionTitle>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                >
                  <Icon size={30} strokeWidth={1.6} style={{ color: accent }} />
                  <h3 className="mt-4 font-heading text-[17px] font-semibold leading-snug text-navy">{service.title}</h3>
                  <PointList points={service.points} />
                </article>
              )
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <QueryButton />
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="mx-auto max-w-container px-6">
          <h2
            className="inline-block px-6 py-3 font-heading text-2xl font-semibold text-white md:text-[1.7rem]"
            style={{ backgroundColor: accent }}
          >
            Flash Bootloader Factsheet:
          </h2>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
            <FactsheetPreview />
            <div className="lg:pt-2">
              <p className="text-[15px] leading-relaxed text-slate-700">
                Read this reference to see the flash bootloader used for ECU reprogramming.
              </p>
              <p className="mt-5 font-semibold text-navy">The factsheet includes:</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
                {FACTSHEET.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-slate-800" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8efe6] py-14 md:py-16">
        <div className="mx-auto max-w-container px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
            Knowledge bytes
          </p>

          <article className="mt-8">
            <KnowledgeTitle index="1">What is Flash Bootloader Software?</KnowledgeTitle>
            <div className="mt-5 border border-slate-200/80 bg-white p-6 text-[15px] leading-relaxed text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              Flash bootloader software sits in the ECU beside the application and performs
              reprogramming and software updates. With it in place, the ECU does not need a JTAG
              programmer, and it does not have to be removed from the vehicle for an update. The
              bootloader design stays independent of the application image it flashes.
            </div>
          </article>

          <article className="mt-12">
            <KnowledgeTitle index="2">Generic Bootloader Software Architecture</KnowledgeTitle>
            <div className="mt-5 border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <MemoryMap />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-navy">Two kinds of bootloader</h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
                    <li>
                      <span className="font-semibold text-navy">Primary bootloader (PBL). </span>
                      Installed in ROM and the first software to run after reset. Its job is to
                      download the secondary bootloader into RAM and start it.
                    </li>
                    <li>
                      <span className="font-semibold text-navy">Secondary bootloader (SBL). </span>
                      Reprograms the ECU application. Keeping this work in the secondary image is
                      what holds the resident footprint down.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid items-start gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <BootFlow />
                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                  <li>The flash bootloader is loaded at the end-of-line station into microcontroller flash, which also stores the ECU application.</li>
                  <li>A valid application receives control. An invalid application leaves control with the bootloader.</li>
                  <li>The bootloader talks to programming tools over UART, LIN, SPI, CAN, Ethernet, and the other links the ECU already uses.</li>
                  <li>It detects and reports power loss, a dropped connection, and flash-write errors.</li>
                  <li>Flash protection is a stored checksum or CRC over the ECU application.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="mt-12">
            <KnowledgeTitle index="3">UDS-based Bootloader Software Architecture</KnowledgeTitle>
            <div className="mt-5 grid items-start gap-6 border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div className="space-y-3">
                <LayerStack
                  layers={[
                    { label: 'Diagnostic services', tone: 'bg-sky-700 text-white' },
                    { label: 'Bootloader sequence and application validator', tone: 'bg-sky-500 text-white' },
                    { label: 'UDS service provider', tone: 'bg-sky-800 text-white' },
                    { label: 'Communication layer — CAN, LIN, UART', tone: 'bg-slate-700 text-white' },
                    { label: 'Flash driver', tone: 'bg-teal-700 text-white' },
                  ]}
                />
                <p className="text-xs leading-relaxed text-slate-500">
                  Multi-packet data is handled by ISO-TP in the transport layer.
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                  A UDS bootloader reprograms the ECU application through diagnostic services that
                  already live on the vehicle network. The services used in the programming session
                  are:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {UDS_SERVICES.map((service) => (
                    <li key={service} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="mt-12">
            <KnowledgeTitle index="4">J1939-based Bootloader Architecture</KnowledgeTitle>
            <div className="mt-5 grid items-start gap-6 border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div className="space-y-3">
                <LayerStack
                  layers={[
                    { label: 'J1939/73 Diagnostic', tone: 'bg-indigo-800 text-white' },
                    { label: 'J1939/71 Application', tone: 'bg-indigo-700 text-white' },
                    { label: 'J1939/81 Network management', tone: 'bg-indigo-600 text-white' },
                    { label: 'J1939/21 Datalink and TP', tone: 'bg-indigo-500 text-white' },
                    { label: 'Communication layer — CAN', tone: 'bg-slate-700 text-white' },
                    { label: 'Flash driver', tone: 'bg-teal-700 text-white' },
                  ]}
                />
              </div>
              <div className="text-sm leading-relaxed text-slate-600 md:text-base">
                <p>
                  ECU application reprogramming can also run on a J1939 bootloader. The link is CAN
                  at 250 kbit/s. Multi-packet transfers are handled by the J1939/21 transport protocol.
                </p>
                <p className="mt-4 font-medium text-navy">Layers in the J1939 bootloader:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {J1939_LAYERS.map((layer) => (
                    <li key={layer} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      <span>{layer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
