"use client";

import { useState } from "react";

export default function AdminPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with Next.js",
      date: "2024-01-01",
      excerpt: "Learn how to build modern web applications with Next.js...",
    },
    {
      id: 2,
      title: "The Power of Tailwind CSS",
      date: "2024-01-15",
      excerpt: "Discover why Tailwind CSS is becoming the go-to styling solution...",
    },
    {
      id: 3,
      title: "Building Accessible Web Apps",
      date: "2024-02-01",
      excerpt: "Best practices for creating accessible web applications...",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    date: "",
    excerpt: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.date && newPost.excerpt) {
      setPosts([
        ...posts,
        { id: posts.length + 1, ...newPost },
      ]);
      setNewPost({ title: "", date: "", excerpt: "" });
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="font-heading text-3xl md:text-4xl">Admin - Manage Blogs</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Add New Blog</h2>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border rounded p-2"
          />
          <input
            type="date"
            name="date"
            value={newPost.date}
            onChange={handleInputChange}
            className="border rounded p-2"
          />
          <textarea
            name="excerpt"
            value={newPost.excerpt}
            onChange={handleInputChange}
            placeholder="Excerpt"
            className="border rounded p-2"
            rows="4"
          />
          <button
            onClick={handleAddPost}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Blog
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-medium">Existing Blogs</h2>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b py-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
