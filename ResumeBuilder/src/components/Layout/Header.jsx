import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const Header = () => {
  const { isSignedIn } = useUser()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Resume Builder
        </Link>
        <nav className="space-x-4">
          {isSignedIn ? (
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          ) : (
            <Link to="/auth/sign-in" className="hover:text-primary">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
