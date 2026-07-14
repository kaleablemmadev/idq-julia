'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { BookOpen, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Black', value: 'black' },
  { name: 'Grey', value: 'grey' },
  { name: 'Light Blue', value: 'lightblue' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[0]

  return (
    <nav className="border-b border-border bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="text-xl font-semibold text-primary">IDQ Julia</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-accent'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition-colors text-primary"
                aria-label="Select theme"
              >
                <Palette className="w-5 h-5" />
                {mounted && <span className="text-sm">{currentTheme.name}</span>}
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-card-bg border border-border rounded-sm shadow-lg z-50">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        setTheme(themeOption.value)
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        theme === themeOption.value
                          ? 'bg-accent-light text-accent'
                          : 'text-secondary hover:text-primary hover:bg-surface'
                      }`}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
