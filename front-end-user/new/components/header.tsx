"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { isAuthenticated, user } = useAuth()

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "COLLECTION", href: "/products" },
    { name: "CONTACT", href: "/contact" },
    { name: "ABOUT US", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <h1 className="text-2xl font-medium tracking-wide">Isabelle Concept & Prints</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm uppercase tracking-wider transition-colors relative ${
                      pathname === item.href
                        ? "font-medium after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-400"
                        : "hover:text-yellow-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Icons */}
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <Link
                href="/account"
                className="text-lg hover:text-yellow-600 transition-colors"
                title={`Welcome, ${user?.firstName}`}
              >
                <User size={18} />
              </Link>
            ) : (
              <Link href="/auth/login" className="text-lg hover:text-yellow-600 transition-colors">
                <User size={18} />
              </Link>
            )}
            <Link href="/cart" className="relative text-lg hover:text-yellow-600 transition-colors">
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav>
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block text-sm uppercase tracking-wider ${
                        pathname === item.href ? "font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {!isAuthenticated && (
                  <li>
                    <Link
                      href="/auth/login"
                      className="block text-sm uppercase tracking-wider"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
