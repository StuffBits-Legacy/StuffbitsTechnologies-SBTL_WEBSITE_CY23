import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

const auto = '/verticals/automotive'
const iot = '/verticals/iot'

const tab = (base, slug) => `${base}#${slug}`

const industryPanels = [
  {
    label: 'Automotive',
    to: auto,
    groups: [
      {
        label: 'Technology Solutions',
        to: tab(auto, 'technology-solutions'),
        items: [
          {
            label: 'ECU Platform Development',
            to: tab(auto, 'ecu-platform-development'),
            children: [
              { label: 'Bootloader', to: tab(auto, 'bootloader') },
              { label: 'Board Support Package', to: tab(auto, 'board-support-package') },
              { label: 'Verification and Validation', to: tab(auto, 'verification-and-validation') },
            ],
          },
          { label: 'Accelerator Solutions', to: tab(auto, 'accelerator-solutions') },
          {
            label: 'Body & Comfort Systems',
            to: tab(auto, 'body-comfort-systems'),
            children: [{ label: 'Body Control Module (BCM)', to: tab(auto, 'body-control-module') }],
          },
        ],
      },
      {
        label: 'Process and Compliance',
        to: tab(auto, 'process-and-compliance'),
        items: [
          { label: 'AUTOSAR', to: tab(auto, 'autosar') },
          { label: 'Model Based Design', to: tab(auto, 'model-based-design') },
          { label: 'Functional Safety (ISO 26262)', to: tab(auto, 'functional-safety') },
        ],
      },
    ],
  },
  {
    label: 'IoT',
    to: iot,
    groups: [
      {
        label: 'Engineering Services',
        to: tab(iot, 'engineering-services'),
        items: [
          {
            label: 'IoT Cloud',
            to: tab(iot, 'iot-cloud'),
            children: [{ label: 'IoT Cloud Services', to: tab(iot, 'iot-cloud-services') }],
          },
          // {
          //   label: 'Porting Services',
          //   to: tab(iot, 'porting-services'),
          //   children: [
          //     { label: 'Android / Linux Porting', to: tab(iot, 'android-linux-porting') },
          //     { label: 'RTOS Kernel Porting', to: tab(iot, 'rtos-kernel-porting') },
          //   ],
          // },
          {
            label: 'IoT App Development',
            to: tab(iot, 'iot-app-development'),
            children: [
              { label: 'IoT Mobile App', to: tab(iot, 'iot-mobile-app') },
              { label: 'IoT Desktop App', to: tab(iot, 'iot-desktop-app') },
              { label: 'IoT Web App', to: tab(iot, 'iot-web-app') },
            ],
          },
          {
            label: 'Embedded Hardware Design and Development',
            to: tab(iot, 'embedded-hardware-design'),
          },
          { label: 'PoC Development', to: tab(iot, 'poc-development') },
        ],
      },
      {
        label: 'Industries',
        to: tab(iot, 'industries'),
        items: [
          { label: 'Industry 4.0', to: tab(iot, 'industry-4-0') },
          { label: 'Automotive/Mobility Services', to: tab(iot, 'automotive-mobility-services') },
        ],
      },
    ],
  },
  { label: 'Industrial', to: '/verticals/industrial' },
  { label: 'Software Development', to: '/verticals/digital-services' },
]

const navLinks = [
  {
    label: 'Industries',
    to: '/verticals',
    mega: industryPanels,
  },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { to: '/services/embedded-hardware', label: 'Embedded Hardware' },
      { to: '/services/embedded-firmware', label: 'Embedded Firmware' },
      { to: '/services/component-assembly', label: 'Production' },
      { to: '/services/it-development', label: 'Software Development' },
    ],
  },
  { to: '/products', label: 'Products' },
  {
    label: 'Company',
    dropdown: [
      { to: '/about', label: 'About Us' },
      { to: '/team', label: 'Our Team' },
      { to: '/blog', label: 'Blog' },
      { to: '/news-and-events', label: 'News & Events' },
    ],
  },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = (active, light) =>
  `relative inline-flex h-full items-center gap-1 px-2.5 text-[17px] font-medium tracking-tight transition-colors ${
    active
      ? 'text-gold after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:bg-gold'
      : light
        ? 'text-white hover:text-gold'
        : 'text-slate-800 hover:text-gold'
  }`

const megaRowClass = (active) =>
  `flex h-[42px] items-center border-b border-slate-200 px-3.5 text-[13px] font-medium leading-snug last:border-b-0 ${
    active ? 'text-gold' : 'text-slate-800 hover:text-gold'
  }`

function linkSlug(to) {
  const hashIndex = to.indexOf('#')
  return hashIndex >= 0 ? to.slice(hashIndex + 1) : ''
}

function selectionFromLocation(pathname, hash) {
  const slug = (hash || '').replace(/^#/, '')
  const industry = industryPanels.findIndex(
    (panel) => pathname === panel.to || pathname.startsWith(`${panel.to}/`)
  )
  if (industry < 0) return { industry: null, group: null, item: null }

  const groups = industryPanels[industry].groups
  if (!groups || !slug) return { industry, group: null, item: null }

  for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
    const group = groups[groupIndex]
    if (linkSlug(group.to) === slug) return { industry, group: groupIndex, item: null }
    const items = group.items ?? []
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const item = items[itemIndex]
      const onChild = (item.children ?? []).some((child) => linkSlug(child.to) === slug)
      if (linkSlug(item.to) === slug || onChild) return { industry, group: groupIndex, item: itemIndex }
    }
  }

  return { industry, group: null, item: null }
}

function mobileOpenKeys(pathname, hash) {
  const keys = new Set()
  const slug = (hash || '').replace(/^#/, '')
  const selection = selectionFromLocation(pathname, hash)
  if (selection.industry == null) return keys

  const panel = industryPanels[selection.industry]
  keys.add(`ind:${panel.label}`)
  if (selection.group == null) return keys

  const group = panel.groups[selection.group]
  keys.add(`grp:${panel.label}:${group.label}`)
  if (selection.item == null) return keys

  const item = group.items[selection.item]
  const onItem = linkSlug(item.to) === slug || (item.children ?? []).some((child) => linkSlug(child.to) === slug)
  if (onItem) keys.add(`itm:${panel.label}:${item.label}`)
  return keys
}

function MegaColumn({ wide, children }) {
  return (
    <div
      className={`-ml-px flex flex-col self-start border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] first:ml-0 ${
        wide ? 'w-[14.25rem]' : 'w-48'
      }`}
    >
      {children}
    </div>
  )
}

function IndustryMegaPanel({ selection, setSelection, pinned, activeSlug, onNavigate }) {
  const industry = industryPanels[selection.industry]
  const groups = industry?.groups ?? []
  const group = selection.group != null ? groups[selection.group] : null
  const items = group?.items ?? []
  const entry = selection.item != null ? items[selection.item] : null
  const children = entry?.children ?? []

  const selectIndustry = (index) => {
    setSelection((current) => {
      if (current.industry === index) return current
      if (pinned.industry === index) return pinned
      return { industry: index, group: null, item: null }
    })
  }

  const selectGroup = (index) => {
    setSelection((current) => ({
      ...current,
      group: index,
      item: current.group === index ? current.item : null,
    }))
  }

  return (
    <div className="flex w-max items-start">
      <MegaColumn>
        {industryPanels.map((panel, index) => (
          <Link
            key={panel.label}
            to={panel.to}
            className={megaRowClass(selection.industry === index)}
            onMouseEnter={() => selectIndustry(index)}
            onFocus={() => selectIndustry(index)}
            onClick={onNavigate}
          >
            {panel.label}
          </Link>
        ))}
      </MegaColumn>

      {groups.length > 0 && (
        <MegaColumn>
          {groups.map((entryGroup, index) => (
            <Link
              key={entryGroup.label}
              to={entryGroup.to}
              className={megaRowClass(selection.group === index)}
              onMouseEnter={() => selectGroup(index)}
              onFocus={() => selectGroup(index)}
              onClick={onNavigate}
            >
              {entryGroup.label}
            </Link>
          ))}
        </MegaColumn>
      )}

      {items.length > 0 && (
        <MegaColumn wide>
          {items.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={megaRowClass(selection.item === index)}
              onMouseEnter={() => setSelection((current) => ({ ...current, item: index }))}
              onFocus={() => setSelection((current) => ({ ...current, item: index }))}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </MegaColumn>
      )}

      {children.length > 0 && (
        <MegaColumn wide>
          {children.map((child) => (
            <Link
              key={child.label}
              to={child.to}
              className={megaRowClass(activeSlug === linkSlug(child.to))}
              onClick={onNavigate}
            >
              {child.label}
            </Link>
          ))}
        </MegaColumn>
      )}
    </div>
  )
}

function MobileBranch({ label, to, open, onToggle, onNavigate, children }) {
  return (
    <li>
      <div className="flex items-center justify-between gap-2">
        <Link to={to} className="block flex-1 py-1.5 text-sm text-slate-700" onClick={onNavigate}>
          {label}
        </Link>
        {children && (
          <button
            type="button"
            className="p-1 text-slate-500"
            aria-expanded={open}
            aria-label={`${open ? 'Hide' : 'Show'} ${label}`}
            onClick={onToggle}
          >
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      {open && children}
    </li>
  )
}

/** Fraction of viewport height; navbar leaves hero styling below this scroll position. */
const HERO_OVERLAY_THRESHOLD = 0.85

const isOverHero = () =>
  typeof window !== 'undefined' &&
  window.location.pathname === '/' &&
  window.scrollY < window.innerHeight * HERO_OVERLAY_THRESHOLD

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [overHero, setOverHero] = useState(isOverHero)
  const [mega, setMega] = useState(() =>
    selectionFromLocation(
      typeof window !== 'undefined' ? window.location.pathname : '/',
      typeof window !== 'undefined' ? window.location.hash : ''
    )
  )
  const [mobileNodes, setMobileNodes] = useState(() =>
    mobileOpenKeys(
      typeof window !== 'undefined' ? window.location.pathname : '/',
      typeof window !== 'undefined' ? window.location.hash : ''
    )
  )
  const closeDropdownTimerRef = useRef(null)
  const location = useLocation()

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to))

  const sectionActive = (item) => {
    if (item.label === 'Company') {
      return (
        location.pathname === '/about' ||
        location.pathname === '/team' ||
        location.pathname.startsWith('/blog') ||
        location.pathname.startsWith('/news-and-events')
      )
    }
    if (item.label === 'Services') return location.pathname.startsWith('/services')
    if (item.label === 'Industries') return location.pathname.startsWith('/verticals')
    return item.to ? isActive(item.to) : false
  }

  const openDropdownMenu = (label) => {
    if (closeDropdownTimerRef.current) {
      window.clearTimeout(closeDropdownTimerRef.current)
      closeDropdownTimerRef.current = null
    }
    if (label === 'Industries' && openDropdown !== 'Industries') {
      setMega(selectionFromLocation(location.pathname, location.hash))
    }
    setOpenDropdown(label)
  }

  const scheduleCloseDropdown = () => {
    if (closeDropdownTimerRef.current) window.clearTimeout(closeDropdownTimerRef.current)
    closeDropdownTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null)
    }, 140)
  }

  const closeMenus = () => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }

  const toggleMobileNode = (key) => {
    setMobileNodes((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setMega(selectionFromLocation(location.pathname, location.hash))
    setMobileNodes(mobileOpenKeys(location.pathname, location.hash))
  }, [location.pathname, location.hash])

  useEffect(() => {
    const check = () => {
      if (location.pathname !== '/') {
        setOverHero(false)
        return
      }
      setOverHero(window.scrollY < window.innerHeight * HERO_OVERLAY_THRESHOLD)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpenDropdown(null)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => {
      if (closeDropdownTimerRef.current) window.clearTimeout(closeDropdownTimerRef.current)
    }
  }, [])

  const onHero = overHero && !mobileOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 border-b transition-colors duration-300 ${
        onHero && !openDropdown
          ? 'border-transparent bg-white/30 backdrop-blur-sm'
          : 'border-slate-200 bg-white'
      }`}
    >
      <nav className="relative mx-auto flex h-full max-w-[90rem] items-center justify-center px-5 lg:px-8">
        <Link to="/" className="absolute left-5 shrink-0 lg:left-8">
          <img src="/icon-1.svg" alt="StuffBits" className="h-8" />
        </Link>

        <ul className="hidden items-center lg:flex">
          {navLinks.map((item) => {
            const active = sectionActive(item)
            const hasMenu = Boolean(item.dropdown || item.mega)
            return (
              <li
                key={item.label}
                className="relative flex h-14 items-center"
                onMouseEnter={() => (hasMenu ? openDropdownMenu(item.label) : scheduleCloseDropdown())}
                onMouseLeave={() => (hasMenu ? scheduleCloseDropdown() : undefined)}
              >
                {hasMenu ? (
                  item.to ? (
                    <Link
                      to={item.to}
                      className={linkClass(active, onHero && !openDropdown)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onFocus={() => openDropdownMenu(item.label)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={linkClass(active, onHero && !openDropdown)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onFocus={() => openDropdownMenu(item.label)}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                    </button>
                  )
                ) : (
                  <NavLink to={item.to} className={() => linkClass(active, onHero && !openDropdown)}>
                    {item.label}
                  </NavLink>
                )}

                {item.mega && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 z-50"
                    onMouseEnter={() => openDropdownMenu(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <IndustryMegaPanel
                      selection={mega}
                      setSelection={setMega}
                      pinned={selectionFromLocation(location.pathname, location.hash)}
                      activeSlug={(location.hash || '').replace(/^#/, '')}
                      onNavigate={closeMenus}
                    />
                  </div>
                )}

                {item.dropdown && openDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full z-50 min-w-[14.25rem] border border-slate-200 bg-white"
                    onMouseEnter={() => openDropdownMenu(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    {item.dropdown.map((d) => (
                      <div key={d.to}>
                        <Link
                          to={d.to}
                          className={`flex h-[42px] items-center px-3.5 text-[13px] font-medium leading-snug ${
                            location.pathname === d.to
                              ? 'text-gold'
                              : 'text-slate-800 hover:text-gold'
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {d.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="absolute right-5 p-2 text-slate-800 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <ul className="px-5 py-3">
            {navLinks.map((item) => (
              <li key={item.label} className="border-b border-slate-100 last:border-b-0">
                {item.mega ? (
                  <div className="py-3">
                    <Link
                      to={item.to}
                      className={`block text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                    <ul className="mt-2 space-y-1 pl-3">
                      {item.mega.map((panel) => {
                        const industryKey = `ind:${panel.label}`
                        return (
                          <MobileBranch
                            key={panel.label}
                            label={panel.label}
                            to={panel.to}
                            open={mobileNodes.has(industryKey)}
                            onToggle={() => toggleMobileNode(industryKey)}
                            onNavigate={closeMenus}
                          >
                            {panel.groups && (
                              <ul className="mb-1 ml-3 border-l border-slate-200 pl-3">
                                {panel.groups.map((group) => {
                                  const groupKey = `grp:${panel.label}:${group.label}`
                                  return (
                                    <MobileBranch
                                      key={group.label}
                                      label={group.label}
                                      to={group.to}
                                      open={mobileNodes.has(groupKey)}
                                      onToggle={() => toggleMobileNode(groupKey)}
                                      onNavigate={closeMenus}
                                    >
                                      {group.items && (
                                        <ul className="mb-1 ml-3 border-l border-slate-200 pl-3">
                                          {group.items.map((entry) => {
                                            const itemKey = `itm:${panel.label}:${entry.label}`
                                            return (
                                              <MobileBranch
                                                key={entry.label}
                                                label={entry.label}
                                                to={entry.to}
                                                open={mobileNodes.has(itemKey)}
                                                onToggle={() => toggleMobileNode(itemKey)}
                                                onNavigate={closeMenus}
                                              >
                                                {entry.children && (
                                                  <ul className="mb-1 ml-3 border-l border-slate-200 pl-3">
                                                    {entry.children.map((child) => (
                                                      <li key={child.label}>
                                                        <Link
                                                          to={child.to}
                                                          className="block py-1.5 text-sm text-slate-600"
                                                          onClick={closeMenus}
                                                        >
                                                          {child.label}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                )}
                                              </MobileBranch>
                                            )
                                          })}
                                        </ul>
                                      )}
                                    </MobileBranch>
                                  )
                                })}
                              </ul>
                            )}
                          </MobileBranch>
                        )
                      })}
                    </ul>
                  </div>
                ) : item.dropdown ? (
                  <div className="py-3">
                    {item.to ? (
                      <Link
                        to={item.to}
                        className={`block text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p className={`text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}>
                        {item.label}
                      </p>
                    )}
                    <ul className="mt-2 space-y-1 pl-3">
                      {item.dropdown.map((d) => (
                        <li key={d.to}>
                          <Link
                            to={d.to}
                            className={`block py-1.5 text-sm ${
                              location.pathname === d.to ? 'text-gold' : 'text-slate-600'
                            }`}
                            onClick={closeMenus}
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`block py-3 text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
