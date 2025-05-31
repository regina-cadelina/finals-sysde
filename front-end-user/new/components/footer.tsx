import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-medium mb-5">Isabelle Concept & Prints</h3>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Your one-stop shop for all your printing needs. We provide high-quality printing services with
              personalized designs.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Twitter size={16} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-black transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-5">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=business-cards"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Business Cards
                </Link>
              </li>
              <li>
                <Link href="/products?category=banners" className="text-gray-600 hover:text-black transition-colors">
                  Banners
                </Link>
              </li>
              <li>
                <Link href="/products?category=flyers" className="text-gray-600 hover:text-black transition-colors">
                  Flyers
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom" className="text-gray-600 hover:text-black transition-colors">
                  Custom Designs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-gray-600" />
                <span className="text-gray-600">123 Print Street, Design City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gray-600" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gray-600" />
                <span className="text-gray-600">info@isabelleprints.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-gray-200 text-sm text-gray-600">
          <p>&copy; 2023 Isabelle Concept & Prints. All rights reserved.</p>
          <div className="flex gap-5 mt-3 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
