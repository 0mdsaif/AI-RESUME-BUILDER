import { useNavigate } from 'react-router-dom';
import { useTheme } from "@/components/ThemeProvider/theme-provider";
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Sparkles, Zap, Users, Star, Award, Layout, Bot, Shield, Briefcase, GraduationCap, ThumbsUp, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

const StatsCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setCount(c => {
              if (c >= value) {
                clearInterval(interval);
                return value;
              }
              return c + 1;
            });
          }, 20);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={countRef} className="text-center transform hover:scale-105 transition-transform">
      <div className="text-4xl font-bold text-white mb-2">{count}+</div>
      <div className="text-purple-200">{label}</div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { isSignedIn } = useUser();

  const handleStartBuilding = () => {
    if (!isSignedIn) {
      navigate('/auth/sign-in');
    } else {
      navigate('/dashboard');
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      review: "The AI suggestions were spot-on! I landed my dream job within 2 weeks.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      review: "The modern templates and ATS optimization really made my resume stand out. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Brown",
      role: "UX Designer",
      company: "Apple",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      review: "Clean interface and amazing AI features. Got 3 interviews within a week of updating my resume!",
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: "How does the AI-powered resume builder work?",
      answer: "Our AI analyzes your input and suggests professional content tailored to your industry and role. It helps optimize your resume for ATS systems and provides real-time suggestions for improvement."
    },
    {
      question: "Can I export my resume in different formats?",
      answer: "Yes! You can export your resume in PDF, Word, and TXT formats. All formats are optimized for ATS compatibility."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties."
    }
  ];

  return (
    <div className="min-h-screen w-full pt-16 bg-background text-foreground">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[500px] w-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                theme === 'dark' 
                  ? `rgba(139, 92, 246, ${0.1 + Math.random() * 0.1})`
                  : `rgba(59, 130, 246, ${0.1 + Math.random() * 0.1})`
              } 0%, rgba(0,0,0,0) 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <main className="relative pb-20 stacking-context">
        {/* Enhanced Hero Section with 3D */}
        <div className={`min-h-[80vh] flex flex-col items-center justify-center px-4 pt-10 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto card-3d stacking-context"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text'
            }`}>
              Create Your Future with AI-Powered Resumes
            </h1>
            <p className={`mb-8 ${
              theme === 'dark' 
                ? 'text-blue-300' 
                : 'text-gray-600'
            }`}>
              Stand out from the crowd with professionally crafted resumes using advanced AI technology
            </p>
            <Button 
              onClick={handleStartBuilding}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl 
                       text-white font-bold text-lg shadow-3d hover:shadow-3d transition-all"
            >
              Start Building Now
            </Button>
          </motion.div>

          {/* Enhanced 3D Resume Preview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-16 card-3d floating-3d stacking-context"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '2000px',
            }}
          >
            <div className="w-64 h-80 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl 
                          transform rotate-y-12 rotate-x-12 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500
                          animate-float">
              {/* Resume Mock Content */}
              <div className="p-6 space-y-4">
                <div className="w-3/4 h-4 bg-white/20 rounded"></div>
                <div className="w-1/2 h-4 bg-white/20 rounded"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-2 bg-white/10 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Feature Cards with 3D */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto px-4 stacking-context">
            {[
              { icon: <Bot />, title: "AI-Powered Writing", desc: "Let AI craft perfect professional summaries" },
              { icon: <Layout />, title: "Modern Templates", desc: "Choose from beautiful, ATS-friendly designs" },
              { icon: <Shield />, title: "Privacy Focused", desc: "Your data stays private and secure" },
              { icon: <Sparkles />, title: "Smart Formatting", desc: "Automatic layout optimization" },
              { icon: <Zap />, title: "Quick Export", desc: "Download in PDF, Word, or TXT format" },
              { icon: <Star />, title: "Premium Features", desc: "Access to advanced resume tools" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover-3d glass-card p-6 rounded-xl border border-white/10 
                       shadow-3d transition-all duration-300 feature-card-hover"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <div className="card-3d-content">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-purple-200' : 'text-gray-600'}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Stats Section */}
          <motion.div 
            style={{ y }}
            className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 px-4"
          >
            <StatsCounter value={58} label={
              <span className={theme === 'dark' ? 'text-purple-200' : 'text-gray-600'}>
                Resumes Created
              </span>
            } />
            <StatsCounter value={95} label="Success Rate" />
            <StatsCounter value={24} label="Hour Support" />
            <StatsCounter value={50} label="Templates" />
          </motion.div>

          {/* New Testimonials Section */}
          <div className="w-full max-w-6xl mx-auto mt-32 px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-4xl font-bold text-center mb-16 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'
              }`}
            >
              What Our Users Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="hover-3d glass-card p-8 rounded-2xl transform 
                       transition-all duration-300 shadow-3d"
                >
                  <div className="card-3d-content">
                    {/* Testimonial content */}
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-purple-500"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                        <p className="text-purple-200">{testimonial.role}</p>
                        <p className="text-purple-300 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className={theme === 'dark' ? 'text-purple-100' : 'text-gray-700'}>"{testimonial.review}"</p>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="w-full max-w-6xl mx-auto mt-32 px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-4xl font-bold text-center mb-16 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'
              }`}
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: 1, title: "Choose a Template", desc: "Select from our collection of ATS-optimized templates" },
                { step: 2, title: "Fill Your Details", desc: "Let AI help you write compelling content" },
                { step: 3, title: "Download & Apply", desc: "Get your perfect resume in minutes" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="step-card relative hover-3d glass-card p-8 rounded-xl text-center shadow-3d"
                >
                  <div className="step-number rounded-full bg-gradient-to-r from-purple-500 to-pink-500
                                flex items-center justify-center text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <div className="step-content">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-purple-200">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Comparison */}
          <div className="w-full max-w-6xl mx-auto mt-32 px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-4xl font-bold text-center mb-16 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'
              }`}
            >
              Why Choose Us
            </motion.h2>
            <div className="glass-card rounded-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "AI-Powered Content",
                  "ATS-Optimized",
                  "Real-time Preview",
                  "Multiple Formats",
                  "24/7 Support",
                  "Custom Sections",
                  "Expert Templates",
                  "Easy Export"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="text-green-400" />
                    <span className="text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="w-full max-w-6xl mx-auto mt-32 px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-4xl font-bold text-center mb-16 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'
              }`}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <span className="text-lg font-semibold text-white">{item.question}</span>
                    <ChevronDown
                      className={`transform transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6">
                      <p className={theme === 'dark' ? 'text-purple-200' : 'text-gray-600'}>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto mt-32 px-4 text-center"
          >
            <div className="glass-card rounded-xl p-12">
              <h2 className={`text-4xl font-bold mb-6 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'
              }`}>
                Ready to Build Your Perfect Resume?
              </h2>
              <p className={theme === 'dark' ? 'text-blue-300 text-xl mb-8' : 'text-purple-700 text-xl mb-8'}>
                Join thousands of successful job seekers who have already created their perfect resume
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;