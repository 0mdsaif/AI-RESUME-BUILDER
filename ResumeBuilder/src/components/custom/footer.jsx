import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import XIcon from '../icons/XIcon';
import { useTheme } from '@/components/ThemeProvider/theme-provider';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-gray-900'
            }`}>ResumeBuilder</h3>
            <p className="text-sm text-gray-400">
              Create professional resumes with our easy-to-use builder.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-100 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/MdSaif292793" className="text-gray-400 hover:text-gray-100 transition-colors">
                <XIcon />
              </a>
              <a href="https://www.instagram.com/08mdsaif/" className="text-gray-400 hover:text-gray-100 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/08mdsaif/" className="text-gray-400 hover:text-gray-100 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-gray-900'
            }`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gray-100 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-gray-100 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-400 hover:text-gray-100 transition-colors">Templates</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-gray-900'
            }`}>Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-gray-100 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-gray-100 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-gray-100 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-gray-900'
            }`}>Contact</h4>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>mdsaifop1@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ResumeBuilder. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ by <span className="text-purple-400 font-medium">MD SAIF</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
