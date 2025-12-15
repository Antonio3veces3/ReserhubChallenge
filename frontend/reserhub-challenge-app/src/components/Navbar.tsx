import { useState, useRef, useEffect } from 'react'
import { FaAngleDown, FaAngleUp, FaArrowRight, FaBus } from 'react-icons/fa'
import { Link, useNavigate, type NavigateFunction } from 'react-router-dom'


export function Navbar() {

    const [username, setUsername] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        setUsername(storedUsername)
    }, [])

    return (
        <nav className="w-full bg-linear-to-r bg-gray-50 shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <LogoNavbar />
                    <TabsNavbar />
                    <RightSectionNavbar username={username} navigate={navigate} />
                </div>
            </div>
        </nav>
    )
}

const LogoNavbar = () => {
    return (
        <div className="shrink-0 flex items-center gap-2">
            <div className="text-3xl font-bold"><FaBus /></div>
            <span className="text-gray-800 text-3xl font-bold">ReserHub</span>
        </div>
    )
}

const TabsNavbar = () => {
    return (
        <div className="hidden md:flex items-center space-x-8">
            <Link
                to="/home"
                className="text-md font-semibold"
            >
                Home
            </Link>
        </div >
    )
}

interface RightSectionNavbarProps {
    username: string | null;
    navigate: NavigateFunction;
}
const RightSectionNavbar = ({ username, navigate }: RightSectionNavbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        setIsDropdownOpen(false)
        navigate('/auth/sign-in', { replace: true })
    }

    const dropdownIcon = isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />

    return (
        <div className="flex items-center gap-4">
            {username ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-gray-900 px-3 py-2 rounded-md  duration-200"
                    >
                        <span className="text-sm font-medium">{username}</span>
                        {dropdownIcon}


                    </button>

                    {isDropdownOpen && (
                        <DropdownMenu handleLogout={handleLogout} />
                    )}
                </div>
            ) : (
                <Link
                    to="/auth/sign-in"
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                    Sign In
                </Link>
            )}
        </div>
    )
}

interface DropdownMenuProps {
    handleLogout: () => void;
}
const DropdownMenu = ({ handleLogout }: DropdownMenuProps) => {
    return (
        <div className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
            >
                Logout
                <FaArrowRight />
            </button>
        </div>
    )
}