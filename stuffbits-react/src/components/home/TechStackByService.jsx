import { motion as Motion } from 'framer-motion'
import {
  EmbeddedFirmwareIcon,
  EmbeddedHardwareIcon,
  ProductionIcon,
  SoftwareDevelopmentIcon,
} from '../icons/ServiceIcons'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SERVICES = [
  {
    title: 'Embedded Hardware (Incl. PCB Layout)',
    category: 'CAD & EDA',
    icon: EmbeddedHardwareIcon,
    tags: [
      'Altium Designer',
      'KiCad',
      'Cadence Allegro',
      'Eagle',
      'High-Speed Routing',
      'Impedance Matching',
      'EMI/EMC Mitigation',
      'Multi-layer (Up to 16 Layers)',
      'Rigid-Flex',
      'BGA Fanout',
      'Thermal Simulation',
    ],
  },
  {
    title: 'Embedded Firmware',
    category: 'MCU & RTOS',
    icon: EmbeddedFirmwareIcon,
    tags: [
      'C / Embedded C',
      'C++',
      'FreeRTOS',
      'Zephyr OS',
      'AUTOSAR',
      'STM32 / Cortex M',
      'ESP32',
      'Nordic nRF Series',
      'BLE 5.x',
      'CAN Bus / J1939',
      'MQTT / CoAP',
    ],
  },
  {
    title: 'Production & Prototyping',
    category: 'SMT & QA',
    icon: ProductionIcon,
    tags: [
      'SMT Assembly',
      'Through Hole Soldering',
      'Automated Optical Inspection (AOI)',
      'In-Circuit Testing (ICT)',
      'Functional Bench Testing',
      'Component Lifecycle Management',
      'DFM / DFA Review',
      'Pilot Volume Runs',
    ],
  },
  {
    title: 'Software Development',
    category: 'Cloud & Apps',
    icon: SoftwareDevelopmentIcon,
    tags: [
      'React / Next.js',
      'Node.js',
      'Python / FastAPI',
      'Golang',
      'REST & GraphQL APIs',
      'AWS IoT Core',
      'PostgreSQL / TimescaleDB',
      'Flutter / React Native',
      'Docker Containers',
    ],
  },
]

export default function TechStackByService() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-container px-6">
        <Motion.div {...fadeUp} className="mb-12 text-center">
          <p className="sb-kicker mb-3">Tech Stack &amp; Capabilities</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">Technology by Service</h2>
          <p className="sb-lead mx-auto max-w-3xl">
            Explore the engineering technologies, standards, and disciplines commonly used across
            each service line.
          </p>
        </Motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map(({ title, category, icon, tags }) => {
            const StackIcon = icon
            return (
            <Motion.article key={title} {...fadeUp} className="border border-slate-200 bg-white p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold leading-snug text-navy">
                  <StackIcon size={18} className="shrink-0 text-navy" />
                  {title}
                </h3>
                <span className="shrink-0 pt-1 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-slate-200 bg-white px-3 py-1.5 font-body text-sm text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
