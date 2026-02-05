import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BookCheck,
    Calendar,
    FileText,
    BarChart,
    Settings,
    Library,
    Clock,
    UserCheck,
    HelpCircle,
    X,
    LogOut,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import api from "@/services/api";

interface ProSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

interface Library {
    id: number;
    name: string;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

const ProSidebar = ({
    collapsed,
    onToggle,
    isMobileOpen = false,
    onMobileClose
}: ProSidebarProps) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{
        role: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null>(null);

    const [activeLibrary, setActiveLibrary] = useState<Library | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get user data from localStorage
        const userDataStr = localStorage.getItem("user");
        if (userDataStr) {
            try {
                const user = JSON.parse(userDataStr);
                setUserData(user);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        // Fetch active library
        fetchActiveLibrary();
    }, []);

    // Fetch active library
    const fetchActiveLibrary = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (token) {
                const response = await api.get("/libraries/active");
                if (response.data.success) {
                    setActiveLibrary(response.data.data.library);
                }
            }
        } catch (error: any) {
            console.error("Error fetching active library:", error);
            if (error.response?.status === 401) {
                // Token expired or invalid
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/signin";
            }
        } finally {
            setLoading(false);
        }
    };

    const isAdmin =
        userData?.role === "admin" || userData?.role === "superadmin";

    // Navigation Items
    const navItems = [
        { id: 1, name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: 2, name: "Books", path: "/books", icon: BookOpen },
        { id: 3, name: "Students", path: "/students", icon: Users },
        { id: 4, name: "Borrowings", path: "/borrowings", icon: BookCheck },
        { id: 5, name: "Calendar", path: "/calendar", icon: Calendar },
        { id: 6, name: "Reports", path: "/reports", icon: FileText },
        { id: 7, name: "Analytics", path: "/analytics", icon: BarChart },
        { id: 8, name: "Settings", path: "/settings", icon: Settings }
    ];

    // Handle mobile close on navigation
    const handleNavClick = () => {
        if (window.innerWidth < 1024 && onMobileClose) {
            onMobileClose();
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            <aside
                className={`
                fixed lg:relative top-0 left-0 h-screen z-50 flex flex-col
                ${collapsed ? "w-20" : "w-64"}
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                bg-bgColor transition-all duration-300
                shadow-sm lg:shadow-none
                border-r border-gray-200
            `}
            >
                {/* Library Info Section */}
                <div
                    className={`p-6 ${collapsed ? "flex justify-center" : ""}`}
                >
                    {collapsed ? (
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                            {loading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            ) : activeLibrary?.imageUrl ? (
                                <img
                                    src={activeLibrary.imageUrl}
                                    alt="Library"
                                    className="w-8 h-8 rounded object-cover"
                                />
                            ) : (
                                <Library size={20} className="text-primary" />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {loading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                ) : activeLibrary?.imageUrl ? (
                                    <img
                                        src={activeLibrary.imageUrl}
                                        alt={activeLibrary.name}
                                        className="w-10 h-10 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Library
                                            size={20}
                                            className="text-primary"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium text-gray-900 text-sm truncate max-w-[150px]">
                                        {activeLibrary?.name ||
                                            "No Active Library"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {activeLibrary
                                            ? "Active Library"
                                            : "Select a library"}
                                    </div>
                                </div>
                            </div>
                            {/* Close button for mobile */}
                            <button
                                onClick={onMobileClose}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Navigation Items - Takes remaining space */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                onClick={handleNavClick}
                                className={({ isActive }) => `
                                    flex items-center ${collapsed ? "justify-center" : ""} 
                                    px-3 py-3 transition-all duration-200
                                    ${
                                        isActive
                                            ? "bg-primary text-white font-medium rounded-lg"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                    }
                                    group relative
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={20}
                                            className={`
                                            ${collapsed ? "" : "mr-3"}
                                            ${isActive ? "text-white" : "text-gray-500 group-hover:text-primary"}
                                        `}
                                        />
                                        {!collapsed && <span>{item.name}</span>}

                                        {/* Tooltip for collapsed state */}
                                        {collapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                                {item.name}
                                            </div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* User Info with Logout - Always at bottom */}
                <div className="mt-auto border-t border-gray-200">
                    {!collapsed && userData && (
                        <div className="p-4">
                            <div
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="font-semibold text-primary">
                                        {userData.firstName
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 text-sm truncate">
                                        {userData.firstName || "First"}{" "}
                                        {userData.lastName || "Last"}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {userData.email || "user@email.com"}
                                    </div>
                                </div>
                                {showUserMenu ? (
                                    <ChevronUp
                                        size={16}
                                        className="text-gray-400"
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400"
                                    />
                                )}
                            </div>

                            {/* Logout Menu */}
                            {showUserMenu && (
                                <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span className="text-sm">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Collapsed user icon with logout */}
                    {collapsed && userData && (
                        <div className="p-4">
                            <div className="relative group">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                                    <span className="font-semibold text-primary">
                                        {userData.firstName
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </span>
                                </div>

                                {/* Logout tooltip for collapsed state */}
                                <div className="absolute left-full bottom-0 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default ProSidebar;
