'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    // Validate
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.')
      return
    }

    setError('')
    setUploading(true)

    try {
      const ext = file.name.split('.').pop()
      const filename = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filename, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filename)

      onChange(data.publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleRemove = () => {
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !value && inputRef.current?.click()}
        className={[
          'relative w-full rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden',
          value ? 'border-mainGreen/20 h-44' : 'h-36 cursor-pointer',
          dragging ? 'border-mainGreen bg-mainGreen/5 scale-[1.01]' : value ? 'border-mainGreen/20' : 'border-mainGreen/20 hover:border-mainGreen hover:bg-mainGreen/3',
        ].join(' ')}
      >
        {value ? (
          // Image preview
          <>
            <Image src={value} alt="Preview" fill className="object-cover" sizes="500px" />
            <div className="absolute inset-0 bg-textBlack/0 hover:bg-textBlack/30 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
              <button
                type="button"
                onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
                className="bg-mainWhite text-mainGreen font-medium text-xs px-3 py-1.5 rounded-full cursor-pointer border-none shadow-md hover:bg-bgWhite transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); handleRemove() }}
                className="bg-red-500 text-white font-medium text-xs px-3 py-1.5 rounded-full cursor-pointer border-none shadow-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </>
        ) : uploading ? (
          // Uploading state
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-8 h-8 border-2 border-mainGreen/20 border-t-mainGreen rounded-full animate-spin" />
            <p className="text-sm text-textBlack/50">Uploading…</p>
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${dragging ? 'bg-mainGreen/15' : 'bg-mainGreen/8'}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={`transition-colors ${dragging ? 'text-mainGreen' : 'text-mainGreen/50'}`}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-textBlack/60">
                {dragging ? 'Drop to upload' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-textBlack/30 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-xs">{error}</p>}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* URL input fallback */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-mainGreen/10" />
        <span className="text-xs text-textBlack/30">or paste URL</span>
        <div className="flex-1 h-px bg-mainGreen/10" />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full px-4 py-2.5 rounded-xl border border-mainGreen/15 bg-bgWhite text-textBlack text-sm outline-none focus:border-mainGreen focus:ring-2 focus:ring-mainGreen/10 placeholder:text-textBlack/25"
      />
    </div>
  )
}