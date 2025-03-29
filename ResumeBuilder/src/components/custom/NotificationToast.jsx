import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, x: "-50%" }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -100 }}
      className="fixed top-0 left-1/2 z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[320px] border border-gray-200 dark:border-gray-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationToast;
