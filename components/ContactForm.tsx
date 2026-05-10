'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-mainWhite rounded-3xl border border-mainGreen/10 shadow-[0_8px_40px_rgba(7,55,32,0.08)] p-8">
      <h3 className="text-xl font-semibold text-textBlack mb-6">Send Us a Message</h3>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-mainGreen/10 rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
          <h4 className="text-lg font-semibold text-textBlack mb-1">Message Sent!</h4>
          <p className="text-sm text-textBlack/50">We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Email Address', key: 'email', type: 'email', placeholder: 'hello@example.com' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-textBlack/50 uppercase tracking-wider mb-1.5">{field.label}</label>
              <input
                type={field.type}
                required
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none transition-all focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-textBlack/50 uppercase tracking-wider mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your inquiry…"
              className="w-full px-4 py-3 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none transition-all resize-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-mainGreen hover:bg-secondaryGreen text-mainWhite font-medium py-3.5 rounded-full transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] border-none cursor-pointer text-sm mt-1"
          >
            Send Message →
          </button>
        </form>
      )}
    </div>
  )
}