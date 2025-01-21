import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js and Stripe",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
]

export default function ProjectsPage() {
  return (
    <div className="container py-8" style={{padding:10}}>
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-heading text-3xl md:text-4xl">Projects</h1>
        <p className="text-lg text-muted-foreground">
          A collection of my recent work and side projects.
        </p>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="font-heading text-xl">{project.title}</h2>
              <p className="mt-2 text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:underline"
              >
                View Project <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}