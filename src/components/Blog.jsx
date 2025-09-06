import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const blogPosts = [
    {
      id: 1,
      title: "Building 3D UIs with React Three Fiber",
      slug: "3d-uis-r3f",
      excerpt: "Learn how to create immersive 3D user interfaces using React Three Fiber, from basic scenes to advanced animations and interactions.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "3D Development",
      featured: true,
    },
    {
      id: 2,
      title: "Mastering Framer Motion Animations",
      slug: "framer-motion-guide",
      excerpt: "A comprehensive guide to creating smooth, performant animations with Framer Motion in React applications.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Animation",
      featured: true,
    },
    {
      id: 3,
      title: "Optimizing Three.js Performance",
      slug: "threejs-performance",
      excerpt: "Best practices for optimizing Three.js applications, including geometry optimization, texture management, and rendering techniques.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Performance",
      featured: false,
    },
    {
      id: 4,
      title: "Modern CSS Techniques for Web Developers",
      slug: "modern-css-techniques",
      excerpt: "Explore advanced CSS features like container queries, CSS Grid, and custom properties for modern web development.",
      date: "2024-01-01",
      readTime: "7 min read",
      category: "CSS",
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const featuredPosts = blogPosts.filter(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <section ref={ref} id="blog" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-center"
        >
          Blog & Articles
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-center text-lg mb-16 max-w-2xl mx-auto"
        >
          Thoughts on web development, 3D graphics, and the latest in frontend technology.
        </motion.p>

        {/* Featured Posts */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Featured Articles</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className="group relative overflow-hidden rounded-2xl glass-enhanced hover:shadow-2xl transition-all duration-500 hover-3d"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{post.date}</span>
                    <motion.a
                      href={`/blog/${post.slug}`}
                      whileHover={{ x: 5 }}
                      className="text-accent-blue font-semibold hover:underline flex items-center gap-2"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Other Posts */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-white mb-8">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherPosts.map((post, index) => (
              <motion.article
                key={post.id}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative overflow-hidden rounded-xl glass-enhanced hover:shadow-xl transition-all duration-300 hover-3d animate-float-up"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                    {post.title}
                  </h5>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    <motion.a
                      href={`/blog/${post.slug}`}
                      whileHover={{ x: 3 }}
                      className="text-accent-purple text-sm font-medium hover:underline"
                    >
                      Read →
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 glass-enhanced rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get notified when I publish new articles about web development and 3D graphics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-surface border border-gray-600 rounded-lg focus:border-accent-blue focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};

export default Blog;
