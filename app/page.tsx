import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-center" style={{ margin: 2 }}>
      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary"><div className="err">R Kiran Kumar Reddy</div></span>
          </h1>
          <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
            I'm a <b>Generative-AI</b> developer passionate about building <b>AI Agents</b> and Realtime AI applications.
            I am interested in doing <b>AI Research</b>. This site contains my Blog posts and Projects.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/blog">Read Blog</Link>
            </Button>
          </div>
          <div className="flex gap-6">
            <Link href="https://github.com/RKiranKumarReddy010" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{ color: "red" }}>
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/kir4n_kum4r_/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{ color: "red" }}>
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{ color: "red" }}>
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>

      </section>

      <section className="container space-y-8 py-8 md:py-12 lg:py-24 bg-muted/50">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
            Featured Projects
          </h2>
          <p className="max-w-[85%] leading-relaxed text-muted-foreground sm:text-lg">
            Here are some of my recent projects. Check out my projects page for more.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col justify-between p-6 hover:shadow-lg transition-shadow">
              <div>
                <h3 className="font-heading text-xl font-semibold">Project {i}</h3>
                <p className="mt-2 text-muted-foreground">
                  A brief description of project {i} and what technologies were used.
                </p>
              </div>
              <Button variant="ghost" className="mt-6" asChild>
                <Link href={`/projects/${i}`}>
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="container space-y-8 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
            Latest Blog Posts
          </h2>
          <p className="max-w-[85%] leading-relaxed text-muted-foreground sm:text-lg">
            Thoughts on development, design, and technology.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem]">
          {[1, 2].map((i) => (
            <Card key={i} className="flex flex-col justify-between p-6 hover:shadow-lg transition-shadow">
              <div>
                <p className="text-sm text-muted-foreground">January {i}, 2024</p>
                <h3 className="font-heading text-xl mt-2 font-semibold">Blog Post {i}</h3>
                <p className="mt-2 text-muted-foreground">
                  A brief preview of blog post {i} content goes here...
                </p>
              </div>
              <Button variant="ghost" className="mt-6" asChild>
                <Link href={`/blog/${i}`}>
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}