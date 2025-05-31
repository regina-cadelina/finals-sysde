"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductModal from "@/components/product-modal"
import Image from "next/image"

const allProducts = [
  {
    id: 1,
    name: "Premium Business Card",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "business-cards",
    tags: ["bestseller"],
  },
  {
    id: 5,
    name: "Standard Business Card",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "business-cards",
    tags: [],
  },
  {
    id: 2,
    name: "Event Flyer",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "flyers",
    tags: ["new"],
  },
  {
    id: 6,
    name: "Promotional Flyer",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "flyers",
    tags: [],
  },
  {
    id: 3,
    name: "Promotional Banner",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "banners",
    tags: [],
  },
  {
    id: 7,
    name: "Event Banner",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "banners",
    tags: [],
  },
  {
    id: 4,
    name: "Custom T-Shirt Design",
    price: 29.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "custom",
    tags: ["sale"],
  },
  {
    id: 8,
    name: "Custom Mug Design",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "custom",
    tags: [],
  },
]

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")

  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  useEffect(() => {
    let filtered = allProducts

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id)
        break
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }, [selectedCategories, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-medium mb-2">OUR PRODUCTS</h1>
              <div className="text-sm text-gray-600">
                <span>Home</span> / <span>Products</span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                <option value="featured">ALPHABETICALLY, A-Z</option>
                <option value="price-low">PRICE, LOW TO HIGH</option>
                <option value="price-high">PRICE, HIGH TO LOW</option>
                <option value="newest">NEWEST</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-3">
                    {[
                      { value: "business-cards", label: "Business Cards" },
                      { value: "banners", label: "Banners" },
                      { value: "flyers", label: "Flyers" },
                      { value: "custom", label: "Custom Designs" },
                    ].map((category) => (
                      <label key={category.value} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.value)}
                          onChange={() => handleCategoryChange(category.value)}
                          className="mr-3"
                        />
                        <span>{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden mb-4 bg-gray-100">
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
                      <p className="text-lg text-black">
                        {product.originalPrice && (
                          <span className="line-through text-gray-500 mr-2">${product.originalPrice}</span>
                        )}
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {selectedProduct && <ProductModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
