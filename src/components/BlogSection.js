// src/components/BlogSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        const postsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        // Optionally sort posts by date
        postsData.sort((a, b) => b.date.seconds - a.date.seconds);
        setBlogPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <section id="blog" className="py-20 px-6 bg-background text-textPrimary">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ translateY: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-primary">{post.title}</h3>
                {post.date && (
                  <p className="text-sm text-gray-500 mb-2">
                    {post.date.toDate().toLocaleDateString()}
                  </p>
                )}
                <p className="mb-4 text-textSecondary">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-secondary hover:underline font-medium"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
