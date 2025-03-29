import { useState } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/header'
import Footer from './components/custom/footer';
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './components/ThemeProvider/theme-provider'
import { NotificationsProvider } from './context/NotificationsContext';

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <NotificationsProvider>
        <div className="min-h-screen w-full bg-background text-foreground">
          <Header />
          <main className="w-full pt-16"> {/* Added w-full */}
            {isLoaded && !isSignedIn && window.location.pathname !== '/' && (
              <Navigate to={'/auth/sign-in'} />
            )}
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      </NotificationsProvider>
    </ThemeProvider>
  )
}

export default App