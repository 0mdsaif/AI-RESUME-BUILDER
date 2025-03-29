import React from 'react';
import { useNotifications } from '@/context/NotificationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layoutId={`notification-${notification.id}`}
                    className={`p-3 rounded-lg ${
                      notification.read 
                        ? 'bg-gray-50 dark:bg-gray-700/50' 
                        : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          >
                            <Check className="w-4 h-4 text-blue-500" />
                          </button>
                        )}
                        <button
                          onClick={() => clearNotification(notification.id)}
                          className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No notifications
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
