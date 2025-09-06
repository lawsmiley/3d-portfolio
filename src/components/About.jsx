import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skills = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'JavaScript', level: 95 },
    { name: 'Python', level: 80 },
    { name: 'Three.js', level: 75 },
    { name: 'MongoDB', level: 70 },
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

  return (
    <section ref={ref} id="about" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Text Content */}
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            I'm a passionate developer from India who loves building web apps, 
            experimenting with new technologies, and solving real-world problems. 
            I specialize in React, Node.js, and modern JavaScript frameworks, 
            but I'm always exploring new areas like cloud computing and blockchain.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            When I'm not coding, you can find me exploring the latest tech trends, 
            contributing to open-source projects, or sharing knowledge with the 
            developer community.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="text-center p-4 glass-enhanced rounded-xl hover-3d animate-float-up"
            >
              <div className="text-3xl font-bold text-accent-blue">50+</div>
              <div className="text-gray-400">Projects</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="text-center p-4 glass-enhanced rounded-xl hover-3d animate-float-up"
            >
              <div className="text-3xl font-bold text-accent-purple">3+</div>
              <div className="text-gray-400">Years Experience</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h3>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">{skill.name}</span>
                <span className="text-accent-blue font-semibold">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Additional Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 grid md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 glass-enhanced rounded-xl text-center hover-3d animate-float-up"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-2">Fast Development</h3>
          <p className="text-gray-400">
            Quick to learn and implement new technologies
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 glass-enhanced rounded-xl text-center hover-3d animate-float-up"
        >
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Creative Solutions</h3>
          <p className="text-gray-400">
            Innovative approaches to complex problems
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 glass-enhanced rounded-xl text-center hover-3d animate-float-up"
        >
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Team Player</h3>
          <p className="text-gray-400">
            Great at collaborating and mentoring others
          </p>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};

export default About;
