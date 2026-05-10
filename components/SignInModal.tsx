'use client'

import { useEffect, useState } from 'react'

interface SignInModalProps {
  open: boolean
  onClose: () => void
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2A2218]/50 backdrop-blur-sm
        animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#FDFAF5] rounded-3xl p-10 text-center max-w-[340px] w-[90%] shadow-2xl animate-[scaleIn_0.25s_ease-out]">
        <div className="w-16 h-16 bg-[#2D4A35]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🌿
        </div>
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#2A2218] mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-[#7A6F62] mb-6">Sign in to your Bean &amp; Bloom account</p>

        <div className="text-left mb-3">
          <label className="text-[0.75rem] font-medium text-[#7A6F62] block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 border border-[#6B4F3A]/15 rounded-xl bg-[#F5F0E8] text-[0.88rem] text-[#2A2218]
              outline-none transition-all focus:border-[#2D4A35] focus:ring-2 focus:ring-[#2D4A35]/10 placeholder:text-[#7A6F62]/60
              font-['DM_Sans']"
          />
        </div>

        <div className="text-left mb-5">
          <label className="text-[0.75rem] font-medium text-[#7A6F62] block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 border border-[#6B4F3A]/15 rounded-xl bg-[#F5F0E8] text-[0.88rem] text-[#2A2218]
              outline-none transition-all focus:border-[#2D4A35] focus:ring-2 focus:ring-[#2D4A35]/10 placeholder:text-[#7A6F62]/60
              font-['DM_Sans']"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#2D4A35] hover:bg-[#3D6147] text-[#FDFAF5] text-sm font-medium rounded-full
            transition-colors duration-150 border-none cursor-pointer mb-3"
        >
          Sign In
        </button>
        <p className="text-xs text-[#7A6F62]">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-[#2D4A35] hover:underline">Sign up</a>
        </p>
        <button
          onClick={onClose}
          className="mt-3 text-xs text-[#7A6F62] hover:text-[#2A2218] transition-colors bg-none border-none cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
