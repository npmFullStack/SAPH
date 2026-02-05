import {
    Menu,
    X,
    LogIn,
    UserPlus,
    Home,
    Tag,
    Info,
    BookOpen
} from "lucide-react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/Button";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Navigation links data
    const navLinks = [
        { id: 1, name: "Home", path: "/", icon: Home },
        { id: 2, name: "Pricing", path: "/pricing", icon: Tag },
        { id: 3, name: "Learn More", path: "/learn-more", icon: BookOpen }
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-bgColor/95 backdrop-blur-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="font-logo font-bold text-2xl">
                                <span className="text-primary">
                                    SilidAklatan
                                </span>
                                <span className="text-secondary">PH</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation - Middle */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <NavLink
                                        key={link.id}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                            }`
                                        }
                                        end={link.path === "/"} // Add end prop for exact matching on Home
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon size={18} />
                                                <span>{link.name}</span>
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </nav>

                        {/* Desktop Auth Links - Right */}
                        <div className="hidden md:flex items-center space-x-3">
                            <NavLink to="/signin">
                                {({ isActive }) => (
                                    <Button
                                        as="div" // Use as="div" since NavLink already handles the link
                                        variant={
                                            isActive ? "primary" : "outline"
                                        }
                                        size="sm"
                                        icon={LogIn}
                                        iconPosition="left"
                                        className={
                                            isActive
                                                ? ""
                                                : "text-gray-700 hover:text-primary"
                                        }
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </NavLink>
                            <NavLink to="/signup">
                                {({ isActive }) => (
                                    <Button
                                        as="div"
                                        variant={
                                            isActive ? "primary" : "outline"
                                        }
                                        size="sm"
                                        icon={UserPlus}
                                        iconPosition="left"
className={
                                            isActive
                                                ? ""
                                                : "text-gray-700 hover:text-primary"
                                        }
                                    >
                                        Sign Up Free
                                    </Button>
                                )}
                            </NavLink>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4">
                            <div className="flex flex-col space-y-2">
                                {navLinks.map(link => {
                                    const Icon = link.icon;
                                    return (
                                        <NavLink
                                            key={link.id}
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                                                    isActive
                                                        ? "bg-primary text-white"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`
                                            }
                                            onClick={() => setIsMenuOpen(false)}
                                            end={link.path === "/"}
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <Icon size={20} />
                                                    <span className="font-medium">
                                                        {link.name}
                                                    </span>
                                                </>
                                            )}
                                        </NavLink>
                                    );
                                })}
                                <div className="border-t border-gray-200 pt-4
                                mt-2 space-y-4 gap-2">
                                    <NavLink to="/signin">
                                        {({ isActive }) => (
                                            <Button
                                                as="div"
                                                variant={
                                                    isActive
                                                        ? "primary"
                                                        : "outline"
                                                }
                                                fullWidth
                                                icon={LogIn}
                                                iconPosition="left"
                                                className="justify-start"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Sign In
                                            </Button>
                                        )}
                                    </NavLink>
                                    <NavLink to="/signup">
                                        {({ isActive }) => (
                                            <Button
                                                as="div"
                                                variant={isActive
                                                        ? "primary"
                                                        : "outline"
                                                }
                                                    
                                                fullWidth
                                                icon={UserPlus}
                                                iconPosition="left"
                                                className="justify-start"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Sign Up Free
                                            </Button>
                                        )}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
