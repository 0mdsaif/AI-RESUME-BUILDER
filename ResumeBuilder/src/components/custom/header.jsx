import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { 
  Menu, X, FileText, Home, LayoutDashboard, 
  Bell, Search, Moon, Sun, Command 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider/theme-provider";
import { useNotifications } from '@/context/NotificationsContext';
import NotificationsDropdown from './NotificationsDropdown';

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle search with CMD/CTRL + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      // Close search with ESC
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearch && !e.target.closest('.search-container')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSearch]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showNotifications && !e.target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showNotifications]);

  const navItems = [
    { 
      path: "/", 
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      description: "Return to homepage"
    },
    { 
      path: "/dashboard", 
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: "Manage your resumes"
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add your search logic here
  };

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/20" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            to="/"
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AiResumeBuilder
            </span>
          </Link>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="search-container absolute left-0 right-0 top-full mt-2 mx-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchQuery}
                    onChange={handleSearch}
                    autoFocus
                    className="w-full p-4 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <kbd className="absolute right-4 top-4 pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 font-mono text-sm font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <Command className="w-5 h-5" />
              <span className="absolute hidden group-hover:block text-sm bg-gray-900 text-white px-2 py-1 rounded -bottom-10 left-1/2 transform -translate-x-1/2">
                Search (⌘K)
              </span>
            </button>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 transition-transform hover:-rotate-45" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative notifications-container">
              <button 
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationsDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* User Section */}
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-purple-500 rounded-full ring-2 ring-offset-2 ring-purple-500/30",
                  },
                }}
              />
            ) : (
              <Link to="/auth/sign-in">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 rounded-xl mt-2 border border-gray-200/20">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <UserButton />
                  </div>
                ) : (
                  <Link
                    to="/auth/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
