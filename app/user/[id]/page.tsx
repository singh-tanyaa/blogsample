import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the types for Blog
type Blog = {
  id: string;
  title: string;
  rating: number;
};

// Simple StarRating component
const StarRating = ({ rating, onRate }: { rating: number; onRate: (rating: number) => void }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          onClick={() => onRate(index + 1)}
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

   // Function to fetch blogs
   const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://apiblog.peymagen.com/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBlogs();
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://apiblog.peymagen.com/api/user/login", {
        username,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRateBlog = async (blogId: string, rating: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post("https://apiblog.peymagen.com/api/rating", {
        blogId,
        rating
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId ? { ...blog, rating } : blog
        )
      );
    } catch (error) {
      console.error("Error rating blog:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 mb-4 rounded-lg">
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <div className="flex items-center mt-2">
            <p className="mr-2">Rating:</p>
            <StarRating rating={blog.rating} onRate={(rating) => handleRateBlog(blog.id, rating)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
