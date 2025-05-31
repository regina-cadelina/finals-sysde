"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductModal from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Business Card",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["bestseller"],
  },
  {
    id: 2,
    name: "Event Flyer",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["new"],
  },
  {
    id: 3,
    name: "Promotional Banner",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: [],
  },
  {
    id: 4,
    name: "Custom T-Shirt Design",
    price: 29.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["sale"],
  },
]

const categories = [
  {
    name: "Business Cards",
    image: "/placeholder.svg?height=250&width=300",
    link: "/products?category=business-cards",
  },
  {
    name: "Banners",
    image: "/placeholder.svg?height=250&width=300",
    link: "/products?category=banners",
  },
  {
    name: "Flyers",
    image: "/placeholder.svg?height=250&width=300",
    link: "/products?category=flyers",
  },
  {
    name: "Custom Designs",
    image: "/placeholder.svg?height=250&width=300",
    link: "/products?category=custom",
  },
]

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-yellow-400 py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-medium mb-5">PREMIUM PRINTING SOLUTIONS</h2>
            <p className="text-lg mb-8">Personalized designs for all your printing needs</p>
            <Link href="/products">
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-sm font-medium uppercase tracking-wider">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium text-center mb-12">OUR CATEGORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={250}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-4">{category.name}</h3>
                  <Link href={category.link}>
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      VIEW PRODUCTS
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium text-center mb-12">FEATURED PRODUCTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 bg-white">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    onClick={() => setSelectedProduct(product.id)}
                  />
                  {product.tags.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs font-medium text-white uppercase tracking-wider ${
                            tag === "bestseller"
                              ? "bg-black"
                              : tag === "new"
                                ? "bg-green-500"
                                : tag === "sale"
                                  ? "bg-red-500"
                                  : "bg-gray-500"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-normal mb-2">{product.name}</h3>
                  <p className="text-lg text-black mb-4">
                    {product.originalPrice && (
                      <span className="line-through text-gray-500 mr-2">${product.originalPrice}</span>
                    )}
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3">VIEW ALL PRODUCTS</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {selectedProduct && <ProductModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
