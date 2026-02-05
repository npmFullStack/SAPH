import { Navigate, Outlet } from "react-router-dom";
import ProHeader from "@/components/ProHeader";
import ProSidebar from "@/components/ProSidebar";
import { useState, useEffect } from "react";

const ProtectedLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        // Check screen size
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Auto-close mobile menu when resizing to desktop
    useEffect(() => {
        if (!isMobile && mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    }, [isMobile, mobileMenuOpen]);

    // Show loading state while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-bgColor flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Verifying authentication...
                    </p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <div className="flex h-screen bg-bgColor">
            {/* Sidebar */}
            <ProSidebar
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                isMobileOpen={mobileMenuOpen}
                onMobileClose={closeMobileMenu}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <ProHeader
                    sidebarCollapsed={sidebarCollapsed}
                    onToggleSidebar={toggleSidebar}
                    onMobileMenuToggle={toggleMobileMenu}
                    isMobileMenuOpen={mobileMenuOpen}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;
