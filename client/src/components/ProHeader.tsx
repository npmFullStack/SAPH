import {
    Bell,
    Search,
    ChevronDown,
    Filter,
    BookOpen,
    Users,
    BookCheck,
    Calendar,
    SidebarOpen,
    SidebarClose,
    Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProHeaderProps {
    sidebarCollapsed: boolean;
    onToggleSidebar: () => void;
    onMobileMenuToggle?: () => void;
    isMobileMenuOpen?: boolean;
}

type SearchType = "book" | "student" | "checkin" | "checkout" | "";

const ProHeader = ({
    sidebarCollapsed,
    onToggleSidebar,
    onMobileMenuToggle,
    isMobileMenuOpen = false
}: ProHeaderProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchFilter, setShowSearchFilter] = useState(false);
    const [activeSearchType, setActiveSearchType] =
        useState<SearchType>("book"); // Default to "book"
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Check if mobile on mount and on resize
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint to match sidebar
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const searchOptions = [
        { id: "book", label: "Search Book", icon: BookOpen },
        { id: "student", label: "Search Student", icon: Users },
        { id: "checkin", label: "Check In", icon: Calendar },
        { id: "checkout", label: "Check Out", icon: BookCheck }
    ];

    const handleSearchTypeSelect = (type: SearchType) => {
        setActiveSearchType(type);
        setShowSearchFilter(false);

        // Clear search query when switching types
        setSearchQuery("");

        // Here you can add navigation or search functionality
        switch (type) {
            case "book":
                navigate("/books");
                break;
            case "student":
                navigate("/students");
                break;
            case "checkin":
                navigate("/checkin");
                break;
            case "checkout":
                navigate("/checkout");
                break;
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSearchType) {
            alert("Please select a filter first");
            return;
        }

        // Implement search based on activeSearchType
        console.log(`Searching for ${searchQuery} in ${activeSearchType}`);

        // Navigate to appropriate search results page
        if (activeSearchType === "book") {
            navigate(`/books?search=${searchQuery}`);
        } else if (activeSearchType === "student") {
            navigate(`/students?search=${searchQuery}`);
        }
    };

    const getActiveSearchLabel = () => {
        const option = searchOptions.find(opt => opt.id === activeSearchType);
        return option ? option.label : "Select filter...";
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
                {/* Left: Sidebar Toggle and Logo */}
                <div className="flex items-center gap-2">
                    {/* Mobile Menu Toggle Button (visible on mobile) */}
                    {isMobile && (
                        <button
                            onClick={onMobileMenuToggle}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} className="text-gray-600" />
                        </button>
                    )}

                    {/* Desktop Sidebar Toggle Button */}
                    {!isMobile && (
                        <button
                            onClick={onToggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block"
                            aria-label={
                                sidebarCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            {sidebarCollapsed ? (
                                <SidebarOpen size={20} className="text-gray-600" />
                            ) : (
                                <SidebarClose size={20} className="text-gray-600" />
                            )}
                        </button>
                    )}

                    {/* Logo - Mobile & Desktop Versions */}
                    <div className="flex items-center">
                        {/* Full Logo for Desktop */}
                        <span className="hidden md:flex font-logo text-xl font-bold text-primary">
                            SilidAklatan
                            <span className="text-secondary">PH</span>
                        </span>
                        {/* Abbreviated Logo for Mobile */}
                        <span className="md:hidden font-logo text-xl font-bold text-primary">
                            <span className="text-primary">SA</span>
                            <span className="text-secondary">PH</span>
                        </span>
                    </div>
                </div>

                {/* Center: Search Bar with Filter */}
                <div className="flex-1 max-w-2xl mx-2 md:mx-4">
                    <div className="relative">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center"
                        >
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-10 pr-24 md:pr-32 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />

                            {/* Filter Button */}
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowSearchFilter(!showSearchFilter)
                                    }
                                    className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2
                                    bg-primary text-primary-foreground rounded-r-lg
                                    hover:bg-secondary/90 text-white
                                    transition-colors"
                                >
                                    <Filter size={16} />
                                    {/* Text hidden on mobile, shown on md and above */}
                                    <span className="hidden md:inline text-sm font-medium">
                                        {getActiveSearchLabel()}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`hidden md:block transition-transform ${showSearchFilter ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {/* Filter Dropdown */}
                                {showSearchFilter && (
                                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        {searchOptions.map(option => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() =>
                                                        handleSearchTypeSelect(
                                                            option.id as SearchType
                                                        )
                                                    }
                                                    className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 ${activeSearchType === option.id ? "bg-primary/10 text-primary" : "text-gray-700"}`}
                                                >
                                                    <Icon size={16} />
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right: Notifications */}
                <div className="flex items-center gap-1 md:gap-2">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">
                                        Notifications
                                    </h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {[
                                        {
                                            id: 1,
                                            title: "Book Return Reminder",
                                            message:
                                                "'Introduction to Programming' is due tomorrow",
                                            time: "10 min ago"
                                        },
                                        {
                                            id: 2,
                                            title: "New Book Added",
                                            message:
                                                "A new book has been added to the library",
                                            time: "2 hours ago"
                                        },
                                        {
                                            id: 3,
                                            title: "System Update",
                                            message:
                                                "Library system maintenance scheduled",
                                            time: "1 day ago"
                                        }
                                    ].map(notification => (
                                        <div
                                            key={notification.id}
                                            className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="font-medium text-gray-900">
                                                {notification.title}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {notification.message}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-2">
                                                {notification.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100">
                                    <button className="text-primary text-sm font-medium hover:text-primary/80 w-full text-center">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ProHeader;