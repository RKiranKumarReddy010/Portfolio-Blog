"use client"

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container py-8" style={{ padding: 10 }}>
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
              href={post.link || `/blog/${post.id}`}
              className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:underline"
            >
              Read more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
