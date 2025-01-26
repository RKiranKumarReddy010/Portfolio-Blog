"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// Define research item type
interface ResearchItem {
  id: string;
  title: string;
  description: string;
  authors: string[];
  year: number;
  type: "Book" | "Paper";
  link?: string;
}

export default function ResearchPage() {
  const [researchItems, setResearchItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "research"));
        const researchData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ResearchItem[];
        setResearchItems(researchData);
      } catch (error) {
        console.error("Error fetching research items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchItems();
  }, []);

  if (loading) return <p>Loading research items...</p>;

  return (
    <div className="container py-8" style={{ padding: 10 }}>
      <h1 className="font-heading text-3xl md:text-4xl">Research Library</h1>
      <p className="text-lg text-muted-foreground">
        A collection of my research papers and books. Explore and learn more.
      </p>
      <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {researchItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="p-6">
              <h2 className="font-heading text-xl">{item.title}</h2>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <strong>Authors:</strong> {item.authors.join(", ")}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Year:</strong> {item.year}
              </p>
              <Badge variant="secondary" className="mt-2">
                {item.type}
              </Badge>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
