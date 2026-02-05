import { NavLink } from "react-router-dom";
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
    X
} from "lucide-react";

interface ProSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

const ProSidebar = ({
    collapsed,
    onToggle,
    isMobileOpen = false,
    onMobileClose
}: ProSidebarProps) => {
    const [userData, setUserData] = useState<{
        role: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null>(null);

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
    }, []);

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
            `}
            >
                {/* Logo Section */}
                <div
                    className={`p-6 ${collapsed ? "flex justify-center" : ""}`}
                >
                    {collapsed ? (
                        <div className="w-8 h-8 bg-bgColor rounded-lg flex items-center justify-center"></div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div>
                                    <div className="font-mono text-sm leading-tight italic">
                                        <span className="text-gray-500">
                                            No Library
                                        </span>
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
                <nav className="flex-1 space-y-1 overflow-y-auto">
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
                                            ? "bg-primary text-white font-medium rounded-r-full"
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

                {/* User Info - Always at bottom */}
                {!collapsed && userData && (
                    <div className="mt-auto p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="font-semibold text-primary">
                                    {userData.firstName
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 text-sm">
                                    {userData.firstName || "First"}{" "}
                                    {userData.lastName || "Last"}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-[160px]">
                                    {userData.email || "user@email.com"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
};

export default ProSidebar;
