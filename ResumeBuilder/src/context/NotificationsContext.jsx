import React, { createContext, useContext, useState } from 'react';
import NotificationToast from '../components/custom/NotificationToast';
import { AnimatePresence } from 'framer-motion';

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome!",
      message: "Welcome to Resume Builder. Start creating your professional resume now.",
      read: false,
      date: new Date()
    },
    {
      id: 2,
      title: "New Features Available",
      message: "Check out our new AI-powered resume suggestions.",
      read: false,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ]);

  const [currentToast, setCurrentToast] = useState(null);

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const clearNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => 
      notification.id !== notificationId
    ));
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      date: new Date(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);
    setCurrentToast(newNotification);
  };

  return (
    <NotificationsContext.Provider value={{
      notifications,
      markAsRead,
      markAllAsRead,
      clearNotification,
      addNotification
    }}>
      {children}
      <AnimatePresence>
        {currentToast && (
          <NotificationToast
            notification={currentToast}
            onClose={() => setCurrentToast(null)}
          />
        )}
      </AnimatePresence>
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
