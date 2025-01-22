import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

const skills = [
  "Python",
  "Flask",
  "Postman",
  "Next.js",
  "Java",
  "Ollama",
  "Langchain",
  "Git",
  "LlamaIndex",
  "Docker",
  "Research"
]

export default function AboutPage() {
  return (
    <div className="container py-8" style={{padding:10}}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl mb-4">About Me</h1>
          <div className="prose dark:prose-invert">
            <p className="text-lg text-muted-foreground">
              Hi! I'm R Kiran Kumar Reddy, a Generative-AI developer 
              building realtime AI applications. I'm passionate about AI Research, and user-friendly applications that solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              When I'm not coding, you can find me writing jokes, Playing Video games, 
              contributing to open-source projects, or exploring new technologies.
            </p>
            <Button className="mt-6">
              <Download className="mr-2 h-4 w-4" href="R Kiran KUMAR REDDY.pdf"/><a href="R Kiran KUMAR REDDY.pdf" download >Download Resume</a>
            </Button>
          </div>
        </div>
        <Card className="p-6">
          <h2 className="font-heading text-xl mb-4">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <h2 className="font-heading text-xl mt-8 mb-4">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Machine Learning Intern (Yhills) </h3>
              <p className="text-sm text-muted-foreground">2024 (Jan) - 2024 (Apr)</p>
              <p className="mt-2">
                Led development of realtime Machine learning apps using python.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Machine Learning Intern (GIETU) </h3>
              <p className="text-sm text-muted-foreground">2024 (June) - 2024 (Aug)</p>
              <p className="mt-2">
                Developed and maintained machine learning project and developed a python module.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Cyber Security Intern (CyebrYaan) </h3>
              <p className="text-sm text-muted-foreground">2023 (June) - 2024 (Aug)</p>
              <p className="mt-2">
                Cyber Security Application with Web Exploitation.
              </p>
            </div>
            <div>
              <h3 className="font-medium">(GDG) Machine Learning Lead</h3>
              <p className="text-sm text-muted-foreground">2024 (Sept) - current</p>
              <p className="mt-2">
                Leading the Machine learning Domain by conducting workshops, events and all.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}