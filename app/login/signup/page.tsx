'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const strength = (() => {
    if (password.length === 0) return 0
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-secondaryGreen'][strength]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required.'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email is required.'
    if (password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (password !== confirm) e.confirm = 'Passwords do not match.'
    if (isAdmin && !adminCode.trim()) e.adminCode = 'Admin code is required.'
    return e
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, adminCode: isAdmin ? adminCode : '' }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErrors({ form: data.error || 'Registration failed.' })
      setLoading(false)
      return
    }

    const signInRes = await signIn('credentials', {
      email, password, redirect: false, callbackUrl: '/',
    })

    setLoading(false)
    if (signInRes?.ok) router.push(data.role === 'admin' ? '/admin' : '/')
    else router.push('/login/signin')
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-bgWhite grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-14 sm:px-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-mainGreen rounded-full flex items-center justify-center text-sm">🌿</div>
            <span className="font-bold text-textBlack text-base">Bean &amp; Bloom</span>
          </div>

          <h1 className="text-3xl font-extrabold text-textBlack mb-1">Create Account</h1>
          <p className="text-textBlack/50 text-sm mb-8">
            Already have an account?{' '}
            <Link href="/login/signin" className="text-mainGreen font-medium hover:underline">Sign in</Link>
          </p>

          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">{errors.form}</div>
          )}

          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-mainGreen/15 bg-mainWhite hover:bg-bgWhite text-textBlack font-medium py-3 rounded-xl transition-all duration-150 cursor-pointer text-sm mb-5 shadow-sm disabled:opacity-60">
            {googleLoading ? <div className="w-4 h-4 border-2 border-mainGreen/30 border-t-mainGreen rounded-full animate-spin" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Redirecting...' : 'Sign up with Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-mainGreen/10" />
            <span className="text-xs text-textBlack/30 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-mainGreen/10" />
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: '' })) }} placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }} placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: '' })) }} placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
                <button type="button" onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textBlack/30 hover:text-textBlack/60 cursor-pointer bg-transparent border-none">
                  {showPassword
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-mainGreen/10'}`} />)}
                  </div>
                  <p className={`text-xs font-medium ${['','text-red-400','text-orange-400','text-yellow-600','text-secondaryGreen'][strength]}`}>{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <input type={showPassword ? 'text' : 'password'} value={confirm} onChange={e => { setConfirm(e.target.value); setErrors(er => ({ ...er, confirm: '' })) }} placeholder="Repeat your password"
                className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
              {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
            </div>

            {/* Admin toggle */}
            <div className="border border-mainGreen/15 rounded-xl p-4 bg-bgWhite">
              <button type="button" onClick={() => { setIsAdmin(a => !a); setAdminCode('') }}
                className="flex items-center justify-between w-full cursor-pointer bg-transparent border-none">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-textBlack">Register as Admin</span>
                  <span className="text-xs bg-mainYellow/20 text-secondaryYellow px-2 py-0.5 rounded-full font-medium">Staff only</span>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${isAdmin ? 'bg-mainGreen' : 'bg-textBlack/20'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isAdmin ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </button>
              {isAdmin && (
                <div className="mt-3 pt-3 border-t border-mainGreen/10">
                  <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">Admin Secret Code</label>
                  <input type="password" value={adminCode} onChange={e => { setAdminCode(e.target.value); setErrors(er => ({ ...er, adminCode: '' })) }} placeholder="Enter admin code"
                    className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-mainWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25" />
                  {errors.adminCode && <p className="text-red-400 text-xs mt-1">{errors.adminCode}</p>}
                </div>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-mainGreen hover:bg-secondaryGreen disabled:opacity-60 text-mainWhite font-semibold py-3.5 rounded-xl transition-all duration-150 cursor-pointer border-none text-sm hover:-translate-y-0.5 mt-1 flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 border-2 border-mainWhite/30 border-t-mainWhite rounded-full animate-spin" />Creating account…</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-textBlack/30 mt-8">
            By signing up you agree to our <a href="#" className="text-mainGreen hover:underline">Terms</a> &amp; <a href="#" className="text-mainGreen hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col bg-mainGreen relative overflow-hidden order-1 lg:order-2">
        <div className="absolute top-0 left-0 w-96 h-96 bg-mainYellow/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondaryGreen/30 rounded-full translate-y-1/3 translate-x-1/4" />
        <div className="relative z-10 flex flex-col flex-1 px-14 py-16 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/images/LogoWhite.png" alt="Bean & Bloom" fill className="object-contain" sizes="40px" />
            </div>
            <span className="text-mainWhite font-bold text-lg tracking-wide">Bean &amp; Bloom</span>
          </div>
          <div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-mainWhite leading-tight mb-4">Join The<br /><span className="text-mainYellow">Community.</span></h2>
            <p className="text-mainWhite/60 text-base leading-relaxed max-w-xs">Create your Bean &amp; Bloom account and unlock exclusive benefits, early access to new blends, and more.</p>
            <div className="flex flex-col gap-3 mt-8">
              {[{ icon: '🌿', text: 'Exclusive member-only deals' }, { icon: '☕', text: 'Save your favourite orders' }, { icon: '📦', text: 'Faster checkout every time' }, { icon: '🎁', text: 'Birthday rewards every year' }].map(f => (
                <div key={f.text} className="flex items-center gap-3"><span className="text-lg">{f.icon}</span><span className="text-mainWhite/70 text-sm">{f.text}</span></div>
              ))}
            </div>
          </div>
          <p className="text-mainWhite/30 text-xs italic">Where Every Sip Blossoms</p>
        </div>
      </div>
    </div>
  )
}