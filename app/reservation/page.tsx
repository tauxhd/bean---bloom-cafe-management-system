'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

// ── Types ──────────────────────────────────────────────────────────────
type Location = 'Inside' | 'Outside' | 'Private Room'
type Duration = '30 minutes' | '1 hour' | '1.5 hours' | '2 hours'

interface Booking {
  date: Date
  timeSlot: string
  duration: Duration
  tableFor: number
  location: Location
  name: string
  email: string
  phone: string
}

// ── Time slot generation ───────────────────────────────────────────────
const DURATION_MINUTES: Record<Duration, number> = {
  '30 minutes': 30,
  '1 hour': 60,
  '1.5 hours': 90,
  '2 hours': 120,
}

const OPEN_HOUR = 8    // 8:00 AM
const CLOSE_HOUR = 21  // 9:00 PM

function generateTimeSlots(duration: Duration): string[] {
  const mins = DURATION_MINUTES[duration]
  const slots: string[] = []
  let current = OPEN_HOUR * 60

  while (current + mins <= CLOSE_HOUR * 60) {
    const startH = Math.floor(current / 60)
    const startM = current % 60
    const endH = Math.floor((current + mins) / 60)
    const endM = (current + mins) % 60

    const fmt = (h: number, m: number) => {
      const period = h >= 12 ? 'pm' : 'am'
      const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
      return `${hour}:${String(m).padStart(2, '0')}${period}`
    }

    slots.push(`${fmt(startH, startM)} - ${fmt(endH, endM)}`)
    current += 30
  }

  return slots
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

// ── Main Page ──────────────────────────────────────────────────────────
export default function ReservationPage() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [duration, setDuration] = useState<Duration>('30 minutes')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [tableFor, setTableFor] = useState<number>(2)
  const [location, setLocation] = useState<Location>('Inside')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    return cells
  }, [viewYear, viewMonth])

  const timeSlots = useMemo(() => generateTimeSlots(duration), [duration])

  // Reset slot when duration changes
  const handleDurationChange = (d: Duration) => {
    setDuration(d)
    setSelectedSlot('')
  }

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day)
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayMidnight
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    )
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!selectedDate) e.date = 'Please select a date.'
    if (!selectedSlot) e.slot = 'Please select a time slot.'
    if (!name.trim()) e.name = 'Name is required.'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email is required.'
    if (!phone.trim()) e.phone = 'Phone number is required.'
    return e
  }

  const handleBook = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bgWhite flex items-center justify-center px-6">
        <div className="bg-mainWhite rounded-3xl border border-mainGreen/10 shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-mainGreen/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🌿</div>
          <h2 className="text-2xl font-bold text-textBlack mb-2">Reservation Confirmed!</h2>
          <p className="text-textBlack/50 text-sm leading-relaxed mb-6">
            Thank you, <span className="font-semibold text-textBlack">{name}</span>! Your table for <strong>{tableFor}</strong> is booked for{' '}
            <strong>{selectedDate?.toDateString()}</strong> at <strong>{selectedSlot}</strong> ({duration}) — {location}.
          </p>
          <p className="text-xs text-textBlack/40 mb-8">A confirmation will be sent to <span className="text-mainGreen">{email}</span></p>
          <button
            onClick={() => {
              setSubmitted(false)
              setSelectedDate(null)
              setSelectedSlot('')
              setName(''); setEmail(''); setPhone('')
            }}
            className="w-full bg-mainGreen hover:bg-secondaryGreen text-mainWhite font-medium py-3 rounded-full transition-colors cursor-pointer border-none"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bgWhite">

      {/* ── HERO ── */}
      <section className="bg-mainGreen px-8 sm:px-14 py-14 lg:py-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-mainWhite leading-tight mb-4">
          Book A <span className="text-mainYellow underline decoration-mainYellow underline-offset-4">Table</span> Now
        </h1>
        <p className="text-mainWhite/60 text-sm max-w-md leading-relaxed">
          Reserve a Table at any time using our online reservation portal to ensure customers are satisfied with our amazing experience. Our tables have a hint of culture and elegance.
        </p>
      </section>

      {/* ── BOOKING PANEL ── */}
      <section className="bg-secondaryWhite px-6 sm:px-10 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr_0.9fr] gap-8 items-start">

          {/* ── LEFT: Calendar + Duration + Time ── */}
          <div className="flex flex-col gap-5">

            {/* Calendar card */}
            <div className="bg-mainWhite rounded-2xl shadow-sm border border-mainGreen/8 overflow-hidden">
              <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-mainGreen/8">
                <div className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-textBlack/40"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span className="text-sm font-semibold text-textBlack">Reservation</span>
                </div>
              </div>

              <div className="px-5 pt-4 pb-2">
                <p className="text-xs font-semibold text-mainYellow uppercase tracking-widest mb-3">Date &amp; Time</p>

                {/* Month navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="text-textBlack/40 hover:text-textBlack transition cursor-pointer bg-transparent border-none p-1"
                  >‹</button>
                  <span className="text-sm font-semibold text-mainYellow">
                    {MONTHS[viewMonth].slice(0, 3).toLowerCase()} {viewYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="text-textBlack/40 hover:text-textBlack transition cursor-pointer bg-transparent border-none p-1"
                  >›</button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map(d => (
                    <div key={d} className="text-center text-[0.65rem] font-medium text-textBlack/40 py-1">
                      {d.toLowerCase()}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-y-1 pb-4">
                  {calendarDays.map((day, i) => {
                    if (day === null) return <div key={`empty-${i}`} />
                    const past = isPast(day)
                    const sel = isSelected(day)
                    const tod = isToday(day)
                    return (
                      <button
                        key={`day-${day}`}
                        disabled={past}
                        onClick={() => {
                          setSelectedDate(new Date(viewYear, viewMonth, day))
                          setErrors(e => ({ ...e, date: '' }))
                        }}
                        className={[
                          'w-8 h-8 mx-auto rounded-full text-sm transition-all duration-150 cursor-pointer border-none',
                          sel ? 'bg-mainYellow text-mainWhite font-bold shadow-md' :
                          tod ? 'border-2 border-mainYellow text-mainYellow font-semibold bg-transparent' :
                          past ? 'text-textBlack/20 cursor-not-allowed' :
                          'text-textBlack/70 hover:bg-mainGreen/10 hover:text-mainGreen'
                        ].join(' ')}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                {errors.date && <p className="text-red-400 text-xs mt-1 pb-2">{errors.date}</p>}
              </div>
            </div>

            {/* Duration + Time slots */}
            <div className="bg-mainWhite rounded-2xl shadow-sm border border-mainGreen/8 px-5 py-5 flex flex-col gap-4">
              <SelectRow
                label="Duration:"
                value={duration}
                onChange={v => handleDurationChange(v as Duration)}
                options={['30 minutes', '1 hour', '1.5 hours', '2 hours']}
              />
              <div>
                <SelectRow
                  label="Available Time-slots:"
                  value={selectedSlot}
                  onChange={v => { setSelectedSlot(v); setErrors(e => ({ ...e, slot: '' })) }}
                  options={timeSlots}
                  placeholder="Select a time"
                />
                {errors.slot && <p className="text-red-400 text-xs mt-1">{errors.slot}</p>}
              </div>
            </div>
          </div>

          {/* ── MIDDLE: Dining + User Info ── */}
          <div className="flex flex-col gap-5">

            {/* Dining information */}
            <div className="bg-mainWhite rounded-2xl shadow-sm border border-mainGreen/8 px-6 py-5">
              <SectionTitle>Dining Information</SectionTitle>
              <div className="flex flex-col gap-4 mt-4">
                <SelectRow
                  label="Table for:"
                  value={String(tableFor)}
                  onChange={v => setTableFor(Number(v))}
                  options={['1', '2', '3', '4', '5', '6', '7', '8', '10', '12']}
                />
                <SelectRow
                  label="Location:"
                  value={location}
                  onChange={v => setLocation(v as Location)}
                  options={['Inside', 'Outside', 'Private Room']}
                />
              </div>
            </div>

            {/* User Information */}
            <div className="bg-mainWhite rounded-2xl shadow-sm border border-mainGreen/8 px-6 py-5">
              <SectionTitle>User Information</SectionTitle>
              <div className="flex flex-col gap-3 mt-4">
                <div>
                  <FieldRow label="Name:">
                    <input
                      type="text"
                      value={name}
                      onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: '' })) }}
                      placeholder="Customer Name..."
                      className="flex-1 bg-bgWhite border border-mainGreen/15 rounded-lg px-3 py-2 text-sm text-textBlack outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25 transition"
                    />
                  </FieldRow>
                  {errors.name && <p className="text-red-400 text-xs mt-1 ml-24">{errors.name}</p>}
                </div>
                <div>
                  <FieldRow label="Email:">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }}
                      placeholder="your@email.com"
                      className="flex-1 bg-bgWhite border border-mainGreen/15 rounded-lg px-3 py-2 text-sm text-textBlack outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25 transition"
                    />
                  </FieldRow>
                  {errors.email && <p className="text-red-400 text-xs mt-1 ml-24">{errors.email}</p>}
                </div>
                <div>
                  <FieldRow label="Phone:">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: '' })) }}
                      placeholder="+675 ..."
                      className="flex-1 bg-bgWhite border border-mainGreen/15 rounded-lg px-3 py-2 text-sm text-textBlack outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25 transition"
                    />
                  </FieldRow>
                  {errors.phone && <p className="text-red-400 text-xs mt-1 ml-24">{errors.phone}</p>}
                </div>
              </div>

              {/* Summary */}
              {selectedDate && selectedSlot && (
                <div className="mt-4 bg-mainGreen/5 border border-mainGreen/10 rounded-xl px-4 py-3 text-xs text-textBlack/60 leading-relaxed">
                  📅 <span className="font-medium text-textBlack">{selectedDate.toDateString()}</span>
                  {' · '}{selectedSlot}
                  {' · '}{duration}
                  {' · '}Table for {tableFor} · {location}
                </div>
              )}

              <button
                onClick={handleBook}
                className="mt-5 w-full bg-secondaryGreen hover:bg-mainGreen text-mainWhite font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer border-none text-sm hover:-translate-y-0.5"
              >
                Book
              </button>
            </div>
          </div>

          {/* ── RIGHT: Restaurant photo ── */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Table.png"
                alt="Bean & Bloom dining"
                fill
                className="object-cover"
                sizes="350px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-mainGreen/30 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-mainWhite/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-xs font-bold text-mainGreen">Bean &amp; Bloom</p>
                <p className="text-[0.65rem] text-textBlack/50">Premium Table Experience</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-mainGreen/10 pb-3">
      <span className="text-sm font-semibold text-textBlack">{children}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-textBlack/30 ml-1">
        <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </div>
  )
}

function SelectRow({ label, value, onChange, options, placeholder }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-mainYellow shrink-0 w-36">{label}</span>
      <div className="relative flex-1">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-bgWhite border border-mainGreen/15 rounded-lg px-3 py-2 text-sm text-textBlack outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 cursor-pointer transition pr-8"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textBlack/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  )
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-mainGreen/70 shrink-0 w-20">{label}</span>
      {children}
    </div>
  )
}