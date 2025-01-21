import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    date: "2024-01-01",
    excerpt: "Learn how to build modern web applications with Next.js...",
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    date: "2024-01-15",
    excerpt: "Discover why Tailwind CSS is becoming the go-to styling solution...",
  },
  {
    id: 3,
    title: "Building Accessible Web Apps",
    date: "2024-02-01",
    excerpt: "Best practices for creating accessible web applications...",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-8" style={{padding:10}}>
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-heading text-3xl md:text-4xl">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, ideas, and insights about web development and technology.
        </p>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col p-6">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h2 className="font-heading text-xl mt-2">{post.title}</h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:underline"
            >
              Read more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}