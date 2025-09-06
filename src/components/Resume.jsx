import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Resume = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Led development of multiple web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices.",
      technologies: ["React", "Node.js", "AWS", "MongoDB", "Docker"],
      achievements: [
        "Increased application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      description: "Developed responsive web applications and collaborated with design teams to create engaging user experiences.",
      technologies: ["React", "TypeScript", "Sass", "Figma"],
      achievements: [
        "Built 15+ client websites",
        "Improved page load times by 30%",
        "Collaborated with design team"
      ]
    },
    {
      title: "Junior Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      description: "Built and maintained web applications, learned modern development practices, and contributed to team projects.",
      technologies: ["JavaScript", "HTML", "CSS", "Git"],
      achievements: [
        "Completed 20+ projects",
        "Learned modern frameworks",
        "Contributed to open source"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science",
      institution: "University of Technology",
      year: "2016 - 2020",
      description: "Graduated with honors, focused on software engineering and web development.",
      gpa: "3.8/4.0"
    }
  ];

  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023" },
    { name: "React Professional Certificate", issuer: "Meta", year: "2022" },
    { name: "MongoDB Certified Developer", issuer: "MongoDB", year: "2021" },
    { name: "Google Cloud Professional", issuer: "Google", year: "2020" }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Python", "Express", "FastAPI", "GraphQL"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Supabase"] },
    { category: "Cloud", items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Vercel"] }
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

  const downloadResume = () => {
    // Create a simple PDF download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Your_Name_Resume.pdf';
    link.click();
  };

  return (
    <section ref={ref} id="resume" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-500">Resume</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              My professional journey, skills, and achievements in the tech industry.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              data-cursor="pointer"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">💼</span>
                Experience
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300"
                  >
                    <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-800"></div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                      <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>
                      <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                      
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">Key Achievements:</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education & Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                Education
              </h3>
              <div className="space-y-6 mb-12">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300"
                  >
                    <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                    <p className="text-purple-400 font-semibold mb-2">{edu.field}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm mb-3">{edu.year} • GPA: {edu.gpa}</p>
                    <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                Certifications
              </h3>
              <div className="grid gap-4 mb-12">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-white font-medium">{cert.name}</span>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-blue-400 text-sm font-medium">{cert.year}</span>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🛠️</span>
                Skills
              </h3>
              <div className="grid gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">{skill.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;