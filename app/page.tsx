"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// Define types for posts and projects
interface Post {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  link?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, "posts"));
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];

        setPosts(postsData.slice(0, 2)); // Limit to 2 blogs
        setProjects(projectsData.slice(0, 3)); // Limit to 3 projects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-16" >
      {/* Hero Section */}
      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 text-center">
        <div className="container max-w-[64rem] space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary" style={{color:"red"}}>R Kiran Kumar Reddy</span>
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl sm:leading-8">
            I'm a <b>Generative-AI</b> developer passionate about building <b>AI Agents</b> and real-time AI applications. 
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
          <div className="flex gap-6 justify-center">
            <Link href="https://github.com/RKiranKumarReddy010" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{color:"red"}}>
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/kir4n_kum4r_/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{color:"red"}}>
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" className="h-12 w-12" style={{color:"red"}}>
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container space-y-8 py-8 md:py-12 lg:py-24 bg-muted/50">
        <h2 className="text-3xl md:text-5xl font-bold text-center" style={{margin:5}}>Featured Projects</h2>
        <p className="text-lg text-muted-foreground" style={{textAlign:"center", margin:5}}>
        Here are some of my projects. Check out my GitHub for more project info.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3" style={{margin:5}}>
          {projects.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-muted-foreground">{project.description}</p>
              <Button variant="ghost" className="mt-4" asChild>
                <Link href={`/projects/${project.id}`}>
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="container space-y-8 py-8 md:py-12 lg:py-24" >
        <h2 className="text-3xl md:text-5xl font-bold text-center" >Latest Blog Posts</h2>
        <p className="text-lg text-muted-foreground" style={{textAlign:"center", margin:5}}>
          Thoughts, ideas, and insights about web development and technology.
        </p>
        <div className="grid gap-6 sm:grid-cols-2" style={{margin:5}}>
          {posts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <p className="text-sm text-muted-foreground">
                {post.date ? new Date(post.date).toLocaleDateString() : "No date available"}
              </p>
              <h3 className="font-heading text-xl mt-2 font-semibold">{post.title}</h3>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <Button variant="ghost" className="mt-4" asChild>
                <Link href={post.link || `/blog/${post.id}`}>
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
