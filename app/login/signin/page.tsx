'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push(callbackUrl)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl })
  }

  return (
    <div className="min-h-screen bg-bgWhite grid lg:grid-cols-2">

      {/* ── LEFT: Branding panel ── */}
      <div className="hidden lg:flex flex-col bg-mainGreen relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mainYellow/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondaryGreen/30 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 flex flex-col flex-1 px-14 py-16 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/images/LogoWhite.png" alt="Bean & Bloom" fill className="object-contain" />
            </div>
            <span className="text-mainWhite font-bold text-lg tracking-wide">Bean &amp; Bloom</span>
          </div>

          {/* Center content */}
          <div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-mainWhite leading-tight mb-4">
              Welcome<br />
              <span className="text-mainYellow">Back.</span>
            </h2>
            <p className="text-mainWhite/60 text-base leading-relaxed max-w-xs">
              Sign in to manage your reservations, track your orders, and enjoy exclusive member perks.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3 mt-8">
              {[
                { icon: '📅', text: 'Manage your table reservations' },
                { icon: '☕', text: 'Track and reorder your favourites' },
                { icon: '🎁', text: 'Earn loyalty points on every order' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-mainWhite/70 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-mainWhite/30 text-xs italic">Where Every Sip Blossoms</p>
        </div>
      </div>

      {/* ── RIGHT: Sign in form ── */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-mainGreen rounded-full flex items-center justify-center text-sm">🌿</div>
            <span className="font-bold text-textBlack text-base">Bean &amp; Bloom</span>
          </div>

          <h1 className="text-3xl font-extrabold text-textBlack mb-1">Sign In</h1>
          <p className="text-textBlack/50 text-sm mb-8">
            Don&apos;t have an account?{' '}
            <Link href="/login/signup" className="text-mainGreen font-medium hover:underline">
              Create one
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-mainGreen/15 bg-mainWhite hover:bg-bgWhite text-textBlack font-medium py-3 rounded-xl transition-all duration-150 cursor-pointer text-sm mb-5 shadow-sm hover:shadow-md disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-mainGreen/30 border-t-mainGreen rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-mainGreen/10" />
            <span className="text-xs text-textBlack/30 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-mainGreen/10" />
          </div>

          {/* Email + password form */}
          <form onSubmit={handleCredentials} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-textBlack/50 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none transition-all focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-textBlack/50 uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-xs text-mainGreen hover:underline cursor-pointer bg-transparent border-none">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none transition-all focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textBlack/30 hover:text-textBlack/60 transition cursor-pointer bg-transparent border-none"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mainGreen hover:bg-secondaryGreen disabled:opacity-60 text-mainWhite font-semibold py-3.5 rounded-xl transition-all duration-150 cursor-pointer border-none text-sm hover:-translate-y-0.5 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-mainWhite/30 border-t-mainWhite rounded-full animate-spin" />
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-textBlack/30 mt-8">
            By signing in you agree to our{' '}
            <a href="#" className="text-mainGreen hover:underline">Terms</a> &amp;{' '}
            <a href="#" className="text-mainGreen hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}