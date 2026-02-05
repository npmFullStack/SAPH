import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Remove query parameters from the last segment
    const cleanPathnames = pathnames.map((path) => {
        return path.split("?")[0];
    });

    // Define custom labels for specific routes
    const getLabel = (path: string) => {
        const labels: Record<string, string> = {
            dashboard: "Dashboard",
            books: "Books",
            students: "Students",
            borrowings: "Borrowings",
            calendar: "Calendar",
            reports: "Reports",
            analytics: "Analytics",
            settings: "Settings",
            profile: "Profile",
            library: "Library",
            "my-books": "My Books",
            history: "History",
            help: "Help",
            checkout: "Check In/Out",
            signin: "Sign In",
            signup: "Sign Up",
        };

        // Convert path to singular if it ends with 's' and has a specific ID after it
        if (pathnames[pathnames.length - 2] === path && !isNaN(Number(pathnames[pathnames.length - 1]))) {
            return labels[path.slice(0, -1)] || path.charAt(0).toUpperCase() + path.slice(1);
        }

        return labels[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <nav className="flex items-center text-sm text-gray-600 mb-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link
                        to="/dashboard"
                        className="flex items-center hover:text-primary transition-colors"
                    >
                        <Home size={16} />
                    </Link>
                </li>
                {cleanPathnames.length > 0 && <ChevronRight size={16} />}
                {cleanPathnames.map((value, index) => {
                    const to = `/${cleanPathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === cleanPathnames.length - 1;

                    return (
                        <li key={to} className="flex items-center">
                            {isLast ? (
                                <span className="text-gray-900 font-medium">
                                    {getLabel(value)}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        to={to}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {getLabel(value)}
                                    </Link>
                                    <ChevronRight size={16} className="ml-2" />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumb;