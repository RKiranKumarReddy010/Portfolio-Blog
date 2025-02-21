"use client";

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";

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

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    excerpt: "",
    link: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...formData,
      });
      setMessage("Post added successfully! ID: " + docRef.id);
      setFormData({ title: "", date: "", excerpt: "", link: "" });
      router.push(`/blog/${docRef.id}`); // Redirect to the blog page
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="font-heading text-3xl mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Excerpt"
          className="p-2 border rounded"
          required
        ></textarea>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link (optional)"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Add Post
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export default AdminPage;
