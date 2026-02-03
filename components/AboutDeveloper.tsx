
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, MessageCircle, ArrowLeft, ExternalLink, User } from 'lucide-react';
import Button from './Button';

interface AboutDeveloperProps {
  onBack: () => void;
}

const AboutDeveloper: React.FC<AboutDeveloperProps> = ({ onBack }) => {
  const socialLinks = [
    {
      name: 'Portfolio',
      url: 'https://kaumahfullstackdeveloper.netlify.app/',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/kaumah24',
      icon: <Github className="w-5 h-5" />,
      color: 'bg-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kaumah-tadeo-544858350/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'bg-blue-700'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/256743626433',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl w-full mx-auto"
    >
      <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
              <User className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-black/20 rounded-full"
            />
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Kaumah Tadeo</h2>
              <p className="text-xl text-indigo-400 font-bold uppercase tracking-widest text-sm">Full Stack Developer</p>
            </div>
            <p className="text-white/60 leading-relaxed text-lg max-w-2xl">
              Crafting immersive digital experiences with modern technologies. 
              Specializing in high-performance web applications, fluid UI/UX, and AI integrations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="glass-dark p-6 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all border border-white/5 hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${link.color} text-white shadow-lg`}>
                  {link.icon}
                </div>
                <span className="text-lg font-bold">{link.name}</span>
              </div>
              <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-white/80 transition-colors" />
            </motion.a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white/40 text-sm">
            Interested in collaboration? Let's build something amazing together.
          </div>
          <Button onClick={onBack} variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            Back to Quiz
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutDeveloper;
