"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { ChevronDown, LogIn, LogOut, User } from "lucide-react"
import { useSession } from "next-auth/react"

// NavItems.tsx
const navItems = [
  { label: "Home", routeTo: "/" },
  { label: "Create", routeTo: "/form" },
  { label: "Dashbaord", routeTo: "/dashboard" },
  { label: "About", routeTo: "/about"}
]

const NavItems = () => {
  return (
    <div className="flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.routeTo}
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

// LogoutButton.tsx
const LogoutButton = () => {
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" }).then(() => window.location.reload())
  }

  return (
    <button
      onClick={logoutHandler}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50/80 rounded-lg transition-colors group"
    >
      <LogOut className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
      <span>Sign Out</span>
    </button>
  )
}

// SignIn.tsx
const SignIn = () => {
  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-md hover:shadow-blue-100 transition-all"
    >
      <LogIn className="w-4 h-4" />
      <span>Get Started</span>
    </Link>
  )
}

// UserProfile.tsx
const UserProfile = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors cursor-pointer group">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="w-3 h-3 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name.slice(0, 3)}</span>
      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
    </div>
  )
}

// Merged Navbar Component
const Navbar = () => {
  const { data: session, status } = useSession()
  const isAuth = status === "authenticated"
  const name = session?.user?.name || null

  return (
    <nav className="w-full fixed top-0 left-0 h-16 flex items-center justify-between px-8 backdrop-blur-lg bg-white/80 border-b border-gray-100/50 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FormWave
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <NavItems />
        <div className="h-6 w-px bg-gray-200 mx-4" />
        {isAuth && name ? (
          <div className="flex items-center gap-4">
            <UserProfile name={name} />
            <LogoutButton />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  )
}

export default Navbar