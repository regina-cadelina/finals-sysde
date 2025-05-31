"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer: (
          <div>
            <p>Placing an order with Isabelle Concept & Prints is easy:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Browse our products and select the item you wish to purchase</li>
              <li>Click on the product to view details and customization options</li>
              <li>Select your preferred options (size, color, quantity, etc.)</li>
              <li>Add any custom text or upload your design if applicable</li>
              <li>Click "Add to Cart"</li>
              <li>Review your cart and proceed to checkout</li>
              <li>Fill in your shipping and payment information</li>
              <li>Confirm your order</li>
            </ol>
            <p className="mt-2">
              You'll receive an order confirmation email once your order has been successfully placed.
            </p>
          </div>
        ),
      },
      {
        question: "What payment methods do you accept?",
        answer: (
          <div>
            <p>We accept the following payment methods:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Bank Transfer (for bulk orders)</li>
              <li>Cash on Delivery (selected areas only)</li>
            </ul>
            <p className="mt-2">All payments are processed securely through our encrypted payment gateway.</p>
          </div>
        ),
      },
      {
        question: "Can I modify or cancel my order after it's been placed?",
        answer: (
          <div>
            <p>
              You can modify or cancel your order within 2 hours of placing it. After this time, your order may have
              already entered the production process.
            </p>
            <p className="mt-2">
              To modify or cancel an order, please contact our customer service team immediately at{" "}
              <a href="mailto:orders@isabelleprints.com" className="text-blue-600 hover:underline">
                orders@isabelleprints.com
              </a>{" "}
              or call (123) 456-7890 with your order number ready.
            </p>
            <p className="mt-2">
              Please note that custom-designed products that have already entered production cannot be canceled or
              refunded.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "Products & Customization",
    questions: [
      {
        question: "What file formats do you accept for custom designs?",
        answer: (
          <div>
            <p>We accept the following file formats for custom designs:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>PDF (preferred for print-ready designs)</li>
              <li>AI (Adobe Illustrator)</li>
              <li>PSD (Adobe Photoshop)</li>
              <li>JPG/JPEG (high resolution, 300 DPI minimum)</li>
              <li>PNG (with transparent background if needed)</li>
              <li>EPS</li>
            </ul>
            <p className="mt-2">
              For best results, please ensure your files are in CMYK color mode with 300 DPI resolution and include a
              0.125" bleed on all sides for printed materials.
            </p>
          </div>
        ),
      },
      {
        question: "Do you offer design services?",
        answer: (
          <div>
            <p>
              Yes, we offer professional design services for all our products. Our team of experienced designers can
              help bring your ideas to life or create something completely new based on your requirements.
            </p>
            <p className="mt-2">
              Design services are available at an additional cost, starting at $50 for basic designs. The final price
              depends on the complexity of the design and the number of revisions needed.
            </p>
            <p className="mt-2">
              To request design services, select the "Professional Design Service" option during checkout or contact our
              design team at{" "}
              <a href="mailto:design@isabelleprints.com" className="text-blue-600 hover:underline">
                design@isabelleprints.com
              </a>
              .
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "What are your shipping options and costs?",
        answer: (
          <div>
            <p>We offer the following shipping options:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Standard Shipping:</strong> 5-7 business days ($5.99)
              </li>
              <li>
                <strong>Express Shipping:</strong> 2-3 business days ($12.99)
              </li>
              <li>
                <strong>Next Day Delivery:</strong> Next business day if ordered before 12pm ($24.99)
              </li>
            </ul>
            <p className="mt-2">Free standard shipping is available for orders over $100.</p>
            <p className="mt-2">
              Shipping times do not include production time, which varies by product. Production times are listed on
              each product page.
            </p>
          </div>
        ),
      },
      {
        question: "Do you ship internationally?",
        answer: (
          <div>
            <p>
              Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
              destination.
            </p>
            <p className="mt-2">
              Please note that international orders may be subject to customs duties and taxes imposed by the
              destination country. These charges are the responsibility of the recipient and are not included in our
              shipping fees.
            </p>
            <p className="mt-2">
              For a quote on international shipping to your location, please add items to your cart and enter your
              shipping address at checkout, or contact our customer service team.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: (
          <div>
            <p>
              We accept returns of non-customized products within 30 days of delivery if they are in their original
              condition and packaging.
            </p>
            <p className="mt-2">
              Custom-designed products cannot be returned unless there is a printing error or defect.
            </p>
            <p className="mt-2">
              To initiate a return, please contact our customer service team at{" "}
              <a href="mailto:returns@isabelleprints.com" className="text-blue-600 hover:underline">
                returns@isabelleprints.com
              </a>{" "}
              with your order number and reason for return.
            </p>
          </div>
        ),
      },
      {
        question: "What if my order arrives damaged or incorrect?",
        answer: (
          <div>
            <p>
              If your order arrives damaged or incorrect, please contact us within 7 days of receiving your order.
              Please include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your order number</li>
              <li>A description of the issue</li>
              <li>Photos of the damaged or incorrect items</li>
            </ul>
            <p className="mt-2">
              We'll work quickly to resolve the issue by either sending a replacement or issuing a refund.
            </p>
          </div>
        ),
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-medium text-center mb-12">FREQUENTLY ASKED QUESTIONS</h1>

          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-medium mb-6">{category.category}</h2>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const itemId = `${categoryIndex}-${questionIndex}`
                    const isOpen = openItems.includes(itemId)

                    return (
                      <div key={questionIndex} className="border-b border-gray-200">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full py-5 flex justify-between items-center text-left hover:text-gray-600 transition-colors"
                        >
                          <h3 className="text-lg font-normal pr-4">{item.question}</h3>
                          <ChevronDown
                            size={20}
                            className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-96 pb-5" : "max-h-0"
                          }`}
                        >
                          <div className="text-gray-600 leading-relaxed">{item.answer}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
