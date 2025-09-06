import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio built with React, Three.js, and Framer Motion. Features animated 3D elements, smooth transitions, and responsive design.",
      image: "🚀",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      liveLink: "https://your-portfolio.com",
      githubLink: "https://github.com/yourusername/portfolio",
      featured: true,
      category: "Web Development"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with user authentication, payment integration, and admin dashboard. Built with MERN stack.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "https://your-ecommerce.com",
      githubLink: "https://github.com/yourusername/ecommerce",
      featured: true,
      category: "Full-Stack"
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Real-time chat application with AI integration, file sharing, and voice messages. Built with Socket.io and OpenAI API.",
      image: "🤖",
      technologies: ["React", "Socket.io", "OpenAI", "Node.js"],
      liveLink: "https://your-chat-app.com",
      githubLink: "https://github.com/yourusername/chat-app",
      featured: true,
      category: "AI/ML"
    },
    {
      id: 4,
      title: "Blockchain Wallet",
      description: "A secure crypto wallet application with Ethereum integration, transaction history, and real-time price tracking.",
      image: "₿",
      technologies: ["React", "Web3.js", "Solidity", "Ethereum"],
      liveLink: "https://your-wallet.com",
      githubLink: "https://github.com/yourusername/wallet",
      featured: false,
      category: "Blockchain"
    },
    {
      id: 5,
      title: "Task Management App",
      description: "Collaborative task management tool with drag-and-drop functionality, team collaboration, and progress tracking.",
      image: "📋",
      technologies: ["React", "Redux", "Firebase", "Material-UI"],
      liveLink: "https://your-tasks.com",
      githubLink: "https://github.com/yourusername/task-manager",
      featured: false,
      category: "Productivity"
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with 3D animations, location-based forecasts, and interactive maps.",
      image: "🌤️",
      technologies: ["React", "Three.js", "Weather API", "Chart.js"],
      liveLink: "https://your-weather.com",
      githubLink: "https://github.com/yourusername/weather-dashboard",
      featured: false,
      category: "Data Visualization"
    }
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

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section ref={ref} id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:bg-gray-800 transition-all duration-500"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    <div className="text-8xl opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                      {project.image}
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                        className="px-6 py-3 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                        className="px-6 py-3 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/10 transition-colors"
                      >
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-sm">Featured</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              More Projects
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative overflow-hidden rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                      <div className="text-6xl opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                        {project.image}
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                          className="px-4 py-2 bg-purple-500 rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors"
                        >
                          Demo
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                          className="px-4 py-2 border-2 border-purple-500 rounded-full text-sm font-semibold hover:bg-purple-500/10 transition-colors"
                        >
                          Code
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;