import { useState, useEffect } from "react";
import ProHeader from "@/components/ProHeader";
import ProSidebar from "@/components/ProSidebar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 1024px)");

    // Initialize collapsed state based on screen size
    useEffect(() => {
        if (isMobile) {
            setSidebarCollapsed(true);
        }
    }, [isMobile]);

    const toggleSidebar = () => {
        if (isMobile) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

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
                    onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                    isMobileMenuOpen={mobileMenuOpen}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;