import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { LinkedInIcon } from '../icons/BrandIcons'
import {
  EmbeddedHardwareIcon,
  EmbeddedFirmwareIcon,
  ProductionIcon,
  SoftwareDevelopmentIcon,
} from '../icons/ServiceIcons'
import SocialIconLinks from '../SocialIconLinks'

const FOOTER_SERVICES = [
  { to: '/services/embedded-hardware', label: 'Embedded Hardware', icon: EmbeddedHardwareIcon },
  { to: '/services/embedded-firmware', label: 'Embedded Firmware', icon: EmbeddedFirmwareIcon },
  { to: '/services/component-assembly', label: 'Production', icon: ProductionIcon },
  { to: '/services/it-development', label: 'Software Development', icon: SoftwareDevelopmentIcon },
]
const FooterMap = lazy(() => import('./FooterMap'))

export default function Footer() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const mapSectionRef = useRef(null)

  useEffect(() => {
    if (!mapSectionRef.current || shouldLoadMap) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(mapSectionRef.current)
    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <footer className="bg-navy text-white">
      <div className="h-1 bg-gold" />
      <div className="max-w-container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-white/100 border border-slate-700 px-3 py-2 mb-5"
            >
              <img src="/icon-1.svg" alt="StuffBits Technologies" className="h-7 opacity-100" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Embedded electronics solutions — hardware, firmware, PCB design, IoT, and digital services.
            </p>
            <SocialIconLinks tone="dark" iconSize={18} />
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-slate-300 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-gold transition-colors">Our Team</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/verticals" className="hover:text-gold transition-colors">Verticals</Link></li>
              <li><Link to="/products" className="hover:text-gold transition-colors">Products</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link to="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/news-and-events" className="hover:text-gold transition-colors">News &amp; Events</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="hover:text-gold transition-colors">Legal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              {FOOTER_SERVICES.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="inline-flex items-center gap-2.5 hover:text-gold transition-colors">
                    <Icon size={16} strokeWidth={1.75} className="text-gold/80 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
            <address className="text-slate-300 text-sm not-italic leading-relaxed space-y-4">
              <p className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-gold/80" aria-hidden />
                <span>
                  <span className="block text-gold text-xs font-semibold uppercase tracking-wider mb-1">Office</span>
                  2nd Floor, Mahadik House, Opposite Pragati Driving School, Near Bhosale Garden, Hadapsar, Pune, Maharashtra – 411028
                </span>
              </p>
              {/* <p className="flex gap-3">
                <Building2 size={18} className="flex-shrink-0 mt-0.5 text-gold/80" aria-hidden />
                <span>
                  <span className="block text-gold text-xs font-semibold uppercase tracking-wider mb-1">Registered Office</span>
                  S. No. 30/2/1, Flat No. B1101, Krishnas Blessing, Pune-Solapur Road, Pune, Maharashtra – 412307
                </span>
              </p> */}
              <p>
                <a href="tel:+919860999078" className="flex items-center gap-3 hover:text-gold transition-colors group">
                  <Phone size={18} className="flex-shrink-0 text-gold/80" />
                  <span>+91 9860999078</span>
                </a>
              </p>
              <p>
                <a href="mailto:contact@stuffbits.in" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <Mail size={18} className="flex-shrink-0 text-gold/80" />
                  <span>contact@stuffbits.in</span>
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Live map with traffic - after address */}
        {/* <div className="mt-12" ref={mapSectionRef}>
          {shouldLoadMap ? (
            <Suspense fallback={<div className="w-full h-64 rounded-lg bg-navy-light/40" aria-hidden />}>
              <FooterMap />
            </Suspense>
          ) : (
            <div className="w-full h-64 rounded-lg bg-navy-light/40 border border-slate-700/60 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShouldLoadMap(true)}
                className="px-4 py-2 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
              >
                Load Map
              </button>
            </div>
          )}
        </div> */}

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} StuffBits Technologies Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/legal#privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/legal#terms" className="hover:text-gold transition-colors">Terms of Use</Link>
            <Link to="/legal#cookies" className="hover:text-gold transition-colors">Cookie Policy</Link>
            <Link to="/legal#disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link>
            <Link to="/legal#disclosures" className="hover:text-gold transition-colors">Statutory Disclosures</Link>
            <a href="https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-1.5">
              <LinkedInIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
