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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AdminProjectsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    link: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Convert technologies to an array
      const technologiesArray = formData.technologies.split(",").map((tech) => tech.trim());

      const docRef = await addDoc(collection(db, "projects"), {
        ...formData,
        technologies: technologiesArray,
      });

      setMessage("Project added successfully! ID: " + docRef.id);
      setFormData({ title: "", description: "", technologies: "", image: "", link: "" });

      // Redirect to the projects listing page
      router.push(`/projects`);
    } catch (error) {
      console.error("Error adding project:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="font-heading text-3xl mb-4">Admin - Add Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Technologies (comma-separated)"
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Redirect URL (optional)"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Add Project
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export default AdminProjectsPage;
