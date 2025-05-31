import { NextResponse } from "next/server"

// This would typically connect to your database
const products = [
  {
    id: 1,
    name: "Premium Business Card",
    price: 24.99,
    category: "business-cards",
    description: "High-quality business cards printed on premium card stock",
    image: "/placeholder.svg?height=300&width=300",
    tags: ["bestseller"],
  },
  {
    id: 2,
    name: "Event Flyer",
    price: 19.99,
    category: "flyers",
    description: "Professional event flyers with vibrant colors",
    image: "/placeholder.svg?height=300&width=300",
    tags: ["new"],
  },
  // Add more products...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  let filteredProducts = products

  if (category) {
    filteredProducts = products.filter((product) => product.category === category)
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Here you would typically save to database
  const newProduct = {
    id: Date.now(),
    ...body,
  }

  return NextResponse.json(newProduct, { status: 201 })
}
