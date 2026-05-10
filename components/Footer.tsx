'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Footer() {
  const [expanded, setExpanded] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When footer is 30% visible, expand it
        if (entry.intersectionRatio >= 0.3) {
          setExpanded(true)
        } else {
          setExpanded(false)
        }
      },
      { threshold: [0, 0.3] }
    )

    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-mainGreen w-full overflow-hidden transition-all duration-700 ease-in-out"
    >
      {/* ── THIN BAR (always visible) ── */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-mainWhite/10">
        <Image
          src="/images/LogoNameWhite.png"
          alt="Bean & Bloom"
          width={140}
          height={40}
          className="object-contain"
        />
        <p className="text-mainWhite/50 text-xs italic hidden sm:block">
          Where Every Sip Blossoms
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-8 h-8 rounded-full border border-mainWhite/20 flex items-center justify-center
                text-mainWhite/60 hover:text-mainWhite hover:border-mainWhite/60 hover:bg-mainWhite/10
                transition-all duration-150"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── EXPANDED CONTENT ── */}
      <div
        className={[
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 transition-all duration-700 ease-in-out',
          expanded ? 'max-h-150 py-10 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Image
            src="/images/LogoWhite.png"
            alt="Bean & Bloom"
            width={56}
            height={56}
            className="object-contain"
          />
          <p className="text-mainWhite/60 text-sm leading-relaxed">
            A cozy corner for great coffee, handcrafted pastries, and moments worth savouring.
          </p>
          <p className="text-mainWhite/30 text-xs">
            © {new Date().getFullYear()} Bean &amp; Bloom. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-mainWhite text-sm font-semibold mb-4 uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-mainWhite/60 hover:text-mainYellow text-sm transition-colors duration-150 no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-mainWhite text-sm font-semibold mb-4 uppercase tracking-widest">
            Opening Hours
          </h4>
          <ul className="flex flex-col gap-2">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between text-sm">
                <span className="text-mainWhite/60">{h.day}</span>
                <span className="text-mainWhite/90 tabular-nums">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-mainWhite text-sm font-semibold mb-4 uppercase tracking-widest">
            Find Us
          </h4>
          <ul className="flex flex-col gap-3">
            {contactInfo.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5">
                <span className="text-mainYellow mt-0.5 shrink-0">{c.icon}</span>
                <span className="text-mainWhite/60 text-sm leading-relaxed">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR (inside expanded) ── */}
      <div
        className={[
          'border-t border-mainWhite/10 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 transition-all duration-700 ease-in-out',
          expanded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <p className="text-mainWhite/30 text-xs">
          Made with ☕ &amp; 🌿 in Malaysia
        </p>
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of Service'].map((t) => (
            <a key={t} href="#" className="text-mainWhite/30 hover:text-mainWhite/60 text-xs transition-colors no-underline">
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Data ──

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Order Online', href: '/order' },
  { label: 'Reservation', href: '/reservation' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const hours = [
  { day: 'Mon – Fri', time: '8:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 10:00 PM' },
  { day: 'Sunday', time: '10:00 AM – 8:00 PM' },
  { day: 'Public Holidays', time: '10:00 AM – 6:00 PM' },
]

const contactInfo = [
  {
    label: 'Address',
    icon: '📍',
    value: '12, Jalan Bukit Bintang, 55100 Kuala Lumpur',
  },
  {
    label: 'Phone',
    icon: '📞',
    value: '+60 3-2345 6789',
  },
  {
    label: 'Email',
    icon: '✉️',
    value: 'hello@beanandbloom.my',
  },
]