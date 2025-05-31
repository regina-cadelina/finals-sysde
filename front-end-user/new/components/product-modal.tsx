"use client"

import { useState, useEffect } from "react"
import { X, Check, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  images: string[]
  colors: { name: string; code: string }[]
  sizes: string[]
  quantities: number[]
  finishes: string[]
  bestseller?: boolean
  new?: boolean
  sale?: boolean
}

const products: Record<number, Product> = {
  1: {
    id: 1,
    name: "Premium Business Card",
    price: 24.99,
    description:
      "Our premium business cards are printed on high-quality 350gsm silk card stock with a smooth matte finish. These cards are perfect for making a professional impression.",
    features: [
      "350gsm silk card stock",
      "Full color printing on both sides",
      "Matte or glossy finish options",
      'Standard size: 3.5" x 2"',
      "Rounded corners option available",
    ],
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    colors: [
      { name: "White", code: "#ffffff" },
      { name: "Cream", code: "#f5f5dc" },
      { name: "Light Gray", code: "#d3d3d3" },
    ],
    sizes: ['Standard (3.5" x 2")', 'Square (2.5" x 2.5")', 'Folded (3.5" x 4")'],
    quantities: [100, 250, 500, 1000],
    finishes: ["Matte", "Glossy", "Soft Touch"],
    bestseller: true,
  },
  2: {
    id: 2,
    name: "Event Flyer",
    price: 19.99,
    description:
      "High-quality event flyers printed on premium 100lb gloss paper. Perfect for promoting your events with vibrant colors and sharp details.",
    features: [
      "100lb gloss paper",
      "Full color printing on one or both sides",
      "Available in multiple sizes",
      "Fast turnaround time",
    ],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [],
    sizes: ['8.5" x 11"', '5.5" x 8.5"', '4" x 6"'],
    quantities: [50, 100, 250, 500],
    finishes: ["Gloss", "Matte"],
    new: true,
  },
  3: {
    id: 3,
    name: "Promotional Banner",
    price: 49.99,
    description:
      "Durable vinyl banners perfect for indoor and outdoor use. Our banners are printed with UV-resistant inks for long-lasting color and include grommets for easy hanging.",
    features: [
      "13oz scrim vinyl material",
      "UV-resistant inks",
      "Waterproof and weather-resistant",
      "Grommets included",
      "Hemmed edges for durability",
    ],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [],
    sizes: ["2' x 4'", "3' x 6'", "4' x 8'", "Custom Size"],
    quantities: [1, 2, 5, 10],
    finishes: ["Matte", "Gloss"],
    bestseller: false,
  },
  4: {
    id: 4,
    name: "Custom T-Shirt Design",
    price: 29.99,
    originalPrice: 34.99,
    description:
      "High-quality custom printed t-shirts. Perfect for events, promotions, or personal use. Our shirts are made from 100% cotton for comfort and durability.",
    features: [
      "100% cotton material",
      "Direct-to-garment printing",
      "Vibrant, long-lasting colors",
      "Available in multiple sizes and colors",
      "Machine washable",
    ],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [
      { name: "White", code: "#ffffff" },
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#000080" },
      { name: "Red", code: "#ff0000" },
      { name: "Gray", code: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    quantities: [1, 5, 10, 25, 50],
    finishes: [],
    sale: true,
  },
}

interface ProductModalProps {
  productId: number
  onClose: () => void
}

export default function ProductModal({ productId, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedFinish, setSelectedFinish] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState("")

  const { addItem } = useCart()
  const product = products[productId]

  useEffect(() => {
    if (product?.finishes.length > 0) {
      setSelectedFinish(product.finishes[0].toLowerCase())
    }
    if (product?.quantities.length > 0) {
      setSelectedQuantity(product.quantities[0].toString())
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      options: {
        size: product.sizes[selectedSize] || "",
        color: product.colors[selectedColor]?.name || "",
        finish: selectedFinish,
        customization,
      },
    }

    addItem(cartItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <Button variant="ghost" size="sm" className="absolute top-4 right-4 z-10" onClick={onClose}>
          <X size={24} />
        </Button>

        <div className="flex flex-col lg:flex-row p-8">
          {/* Images */}
          <div className="flex-1 lg:pr-8">
            <div className="mb-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border-2 ${selectedImage === index ? "border-black" : "border-transparent"}`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="flex gap-2 mb-3">
              {product.bestseller && (
                <span className="bg-black text-white px-2 py-1 text-xs uppercase tracking-wider">BESTSELLER</span>
              )}
              {product.new && (
                <span className="bg-green-500 text-white px-2 py-1 text-xs uppercase tracking-wider">NEW</span>
              )}
              {product.sale && (
                <span className="bg-red-500 text-white px-2 py-1 text-xs uppercase tracking-wider">SALE</span>
              )}
            </div>

            <h2 className="text-2xl font-medium mb-3">{product.name}</h2>
            <p className="text-xl mb-5">
              {product.originalPrice && (
                <span className="line-through text-gray-500 mr-2">${product.originalPrice}</span>
              )}
              ${product.price}
            </p>

            <div className="mb-5">
              <p className="mb-4">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-black" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-5">
              {product.sizes.length > 0 && (
                <div>
                  <label className="block font-medium mb-2">Size:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`px-3 py-2 border text-sm ${
                          selectedSize === index
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors.length > 0 && (
                <div>
                  <label className="block font-medium mb-2">Color:</label>
                  <div className="flex gap-2 mb-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === index ? "border-black" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{product.colors[selectedColor]?.name}</div>
                </div>
              )}

              {product.quantities.length > 0 && (
                <div>
                  <label className="block font-medium mb-2">Quantity:</label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded"
                  >
                    {product.quantities.map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {product.finishes.length > 0 && (
                <div>
                  <label className="block font-medium mb-2">Finish:</label>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded"
                  >
                    {product.finishes.map((finish) => (
                      <option key={finish} value={finish.toLowerCase()}>
                        {finish}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Customization */}
            <div className="mb-5">
              <label className="block font-medium mb-2">Customization Notes:</label>
              <textarea
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="Add any special instructions or customization details here..."
                className="w-full border border-gray-300 px-3 py-2 rounded resize-vertical min-h-[80px]"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mb-5">
              <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-16 text-center border border-gray-300 px-2 py-1 rounded"
                min="1"
                max="100"
              />
              <Button variant="outline" size="sm" onClick={() => setQuantity(Math.min(100, quantity + 1))}>
                <Plus size={16} />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1 bg-black text-white hover:bg-gray-800">
                ADD TO CART
              </Button>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                VIEW DETAILS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
