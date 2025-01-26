"use client";

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authors, setAuthors] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [type, setType] = useState<"Book" | "Paper" | "">("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !authors || !year || !type) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "research"), {
        title,
        description,
        authors: authors.split(",").map((author) => author.trim()),
        year: Number(year),
        type,
        link: link || null,
      });
      alert("Research item added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setAuthors("");
      setYear("");
      setType("");
      setLink("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add research item. Please try again.");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="font-heading text-3xl md:text-4xl">Admin - Add Research Item</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="Authors (comma-separated)"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          required
        />
        <Input
          placeholder="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <Select onValueChange={(value) => setType(value as "Book" | "Paper")} required>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Book">Book</SelectItem>
            <SelectItem value="Paper">Paper</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Add Research Item
        </Button>
      </form>
    </div>
  );
}
