"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-medium mb-8">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link href="/products">
            <Button className="bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 p-4 border border-gray-200 rounded">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {item.options.size && <p>Size: {item.options.size}</p>}
                    {item.options.color && <p>Color: {item.options.color}</p>}
                    {item.options.finish && <p>Finish: {item.options.finish}</p>}
                    {item.options.customization && <p>Notes: {item.options.customization}</p>}
                  </div>
                  <p className="font-medium mt-2">${item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                    <X size={16} />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </Button>
                  </div>

                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded h-fit">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span>${(total + 5.99 + total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800 mb-3">Proceed to Checkout</Button>

            <Link href="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
