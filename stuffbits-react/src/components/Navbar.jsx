import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
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
  {
    label: 'Industries',
    to: '/verticals',
    dropdown: [
      {
        to: '/verticals/automotive',
        label: 'Automotive',
      },
      { to: '/verticals/industrial', label: 'Industrial' },
      { to: '/verticals/iot', label: 'IIoT' },
      { to: '/verticals/digital-services', label: 'Software Development' },
    ],
  },
  { to: '/products', label: 'Products' },
  // { to: '/portfolio', label: 'Work' },
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

const linkClass = (active) =>
  `relative inline-flex h-full items-center gap-1 px-2.5 text-[17px] font-medium tracking-tight transition-colors ${
    active
      ? 'text-gold after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:bg-gold'
      : 'text-slate-800 hover:text-gold'
  }`

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [overHero, setOverHero] = useState(
    () => typeof window !== 'undefined' && window.location.pathname === '/' && window.scrollY < window.innerHeight
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
    setOpenDropdown(label)
  }

  const scheduleCloseDropdown = () => {
    if (closeDropdownTimerRef.current) window.clearTimeout(closeDropdownTimerRef.current)
    closeDropdownTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null)
    }, 140)
  }

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const check = () => {
      if (location.pathname !== '/') {
        setOverHero(false)
        return
      }
      setOverHero(window.scrollY < window.innerHeight * 0.85)
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
        onHero
          ? 'border-transparent bg-white/30 backdrop-blur-sm'
          : 'border-slate-200 bg-white'
      }`}
    >
      <nav className="mx-auto flex h-full max-w-[90rem] items-center justify-between gap-4 px-5 lg:px-8">
        <Link to="/" className="shrink-0">
          <img src="/icon-1.svg" alt="StuffBits" className="h-8" />
        </Link>

        <ul className="hidden items-center lg:flex">
          {navLinks.map((item) => {
            const active = sectionActive(item)
            return (
              <li
                key={item.label}
                className="relative flex h-14 items-center"
                onMouseEnter={() => (item.dropdown ? openDropdownMenu(item.label) : openDropdownMenu(null))}
                onMouseLeave={() => (item.dropdown ? scheduleCloseDropdown() : undefined)}
              >
                {item.dropdown ? (
                  item.to ? (
                    <Link
                      to={item.to}
                      className={linkClass(active)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onFocus={() => openDropdownMenu(item.label)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={linkClass(active)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onFocus={() => openDropdownMenu(item.label)}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                    </button>
                  )
                ) : (
                  <NavLink to={item.to} className={() => linkClass(active)}>
                    {item.label}
                  </NavLink>
                )}

                {item.dropdown && openDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full z-50 min-w-[18rem] border border-slate-200 bg-white py-1.5"
                    onMouseEnter={() => openDropdownMenu(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    {item.dropdown.map((d) => (
                      <div key={d.to}>
                        <Link
                          to={d.to}
                          className={`block px-4 py-2.5 text-sm ${
                            location.pathname === d.to
                              ? 'bg-slate-50 text-gold'
                              : 'text-slate-800 hover:bg-slate-50 hover:text-gold'
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {d.label}
                        </Link>
                        {d.children?.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className={`block py-2 pl-7 pr-4 text-sm ${
                              location.pathname === child.to
                                ? 'bg-slate-50 text-gold'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-gold'
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
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
          className="p-2 text-slate-800 lg:hidden"
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
                {item.dropdown ? (
                  <div className="py-3">
                    {item.to ? (
                      <Link
                        to={item.to}
                        className={`block text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}
                        onClick={() => setMobileOpen(false)}
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
                            onClick={() => setMobileOpen(false)}
                          >
                            {d.label}
                          </Link>
                          {d.children?.length > 0 && (
                            <ul className="mb-1 ml-3 border-l border-slate-200">
                              {d.children.map((child) => (
                                <li key={child.to}>
                                  <Link
                                    to={child.to}
                                    className={`block py-1.5 pl-3 text-sm ${
                                      location.pathname === child.to ? 'text-gold' : 'text-slate-600'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`block py-3 text-[17px] font-medium ${sectionActive(item) ? 'text-gold' : 'text-slate-800'}`}
                    onClick={() => setMobileOpen(false)}
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
