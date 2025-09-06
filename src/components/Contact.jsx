import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'youremail@gmail.com',
      link: 'mailto:youremail@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      description: 'Call or text me directly'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Mumbai, India',
      link: '#',
      description: 'Available for remote work'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '🐙',
      url: 'https://github.com/yourusername',
      color: 'hover:text-gray-300',
      description: 'Check out my code'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-400',
      description: 'Connect professionally'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-500',
      description: 'Follow my updates'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/yourusername',
      color: 'hover:text-pink-500',
      description: 'See my life'
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

  return (
    <section ref={ref} id="contact" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="text-blue-500">Touch</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name" className="block text-gray-300 font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="block text-gray-300 font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label htmlFor="subject" className="block text-gray-300 font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label htmlFor="message" className="block text-gray-300 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="pointer"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      whileHover={{ scale: 1.05, x: 10 }}
                      data-cursor="pointer"
                      className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
                    >
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <p className="text-gray-400 text-sm">{info.title}</p>
                        <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {info.value}
                        </p>
                        <p className="text-gray-500 text-xs">{info.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                      className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{social.icon}</span>
                        <div>
                          <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            {social.name}
                          </p>
                          <p className="text-gray-500 text-xs">{social.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
              >
                <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
                <p className="text-gray-300 text-sm mb-4">
                  I typically respond to messages within 24 hours. For urgent matters, feel free to call or text me directly.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  Available for new projects
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;