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
              <Download className="mr-2 h-4 w-4" /> Download Resume
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
              <h3 className="font-medium">Senior Developer - Tech Corp</h3>
              <p className="text-sm text-muted-foreground">2020 - Present</p>
              <p className="mt-2">
                Led development of multiple full-stack applications using React and Node.js.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Full Stack Developer - StartUp Inc</h3>
              <p className="text-sm text-muted-foreground">2018 - 2020</p>
              <p className="mt-2">
                Developed and maintained various web applications using modern technologies.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}