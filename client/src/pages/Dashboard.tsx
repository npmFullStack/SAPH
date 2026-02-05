import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import PageLayout from "@/components/PageLayout";
import Button from "@/components/Button";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Calendar,
    BarChart,
    Clock,
    CheckCircle,
    AlertCircle,
    Settings,
    User as UserIcon,
    BookCheck,
    FileText,
    ChevronRight,
    Library,
    UserCheck,
    HelpCircle
} from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalStudents: 0,
        activeBorrowings: 0,
        overdueBooks: 0
    });
    const [loading, setLoading] = useState(true);

    // Check if user is admin/superadmin
    const isAdmin = user?.role === "admin" || user?.role === "superadmin";

    useEffect(() => {
        fetchUserData();
        fetchStats();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signin");
                return;
            }

            const response = await api.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setUser(response.data.data.user);
                // Update localStorage with latest user data
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            // If token is invalid, redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            // You can add API calls for stats here
            // For now, using mock data
            setStats({
                totalBooks: 1250,
                totalStudents: 845,
                activeBorrowings: 142,
                overdueBooks: 23
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bgColor flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <PageLayout description={`Welcome back, ${user?.first_name} ${user?.last_name}`}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6">
                {isAdmin ? (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Total Books
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.totalBooks.toLocaleString()}
                                    </h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <BookOpen
                                        className="text-blue-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Total Students
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.totalStudents.toLocaleString()}
                                    </h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Users
                                        className="text-green-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Active Borrowings
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.activeBorrowings}
                                    </h3>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <BookCheck
                                        className="text-purple-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Overdue Books
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.overdueBooks}
                                    </h3>
                                </div>
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <AlertCircle
                                        className="text-red-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Active Borrowings
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.activeBorrowings}
                                    </h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <BookCheck
                                        className="text-blue-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Overdue Books
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        {stats.overdueBooks}
                                    </h3>
                                </div>
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <AlertCircle
                                        className="text-red-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Library Visits
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        42
                                    </h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Calendar
                                        className="text-green-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Reading Hours
                                    </p>
                                    <h3 className="text-3xl font-bold mt-2">
                                        156
                                    </h3>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <Clock
                                        className="text-purple-600"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                {/* Left Column - Quick Actions */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <CheckCircle size={24} />
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {isAdmin ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={BookOpen}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() =>
                                            navigate("/books")
                                        }
                                    >
                                        Manage Books
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={Users}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() =>
                                            navigate("/students")
                                        }
                                    >
                                        Manage Students
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={BookCheck}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() =>
                                            navigate("/checkout")
                                        }
                                    >
                                        Check In/Out
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={FileText}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() =>
                                            navigate("/reports")
                                        }
                                    >
                                        Generate Reports
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={BookOpen}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() => navigate("/library")}
                                    >
                                        Browse Books
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={BookCheck}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() => navigate("/my-books")}
                                    >
                                        My Borrowings
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={Clock}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() => navigate("/history")}
                                    >
                                        Reading History
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        icon={Settings}
                                        iconPosition="left"
                                        className="justify-start py-4"
                                        onClick={() => navigate("/profile")}
                                    >
                                        Account Settings
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Clock size={24} />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    action: "Borrowed 'Introduction to Programming'",
                                    time: "2 hours ago",
                                    icon: BookOpen
                                },
                                {
                                    action: "Returned 'Data Structures & Algorithms'",
                                    time: "Yesterday",
                                    icon: BookCheck
                                },
                                {
                                    action: "Updated profile information",
                                    time: "2 days ago",
                                    icon: UserCheck
                                },
                                {
                                    action: "Extended borrowing period for 'Web Development'",
                                    time: "3 days ago",
                                    icon: Calendar
                                }
                            ].map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                <Icon
                                                    className="text-primary"
                                                    size={16}
                                                />
                                            </div>
                                            <span className="text-gray-700">
                                                {activity.action}
                                            </span>
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            {activity.time}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column - User Info & Analytics */}
                <div className="space-y-8">
                    {/* User Profile Card */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <UserIcon size={24} />
                            Your Profile
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Name
                                </span>
                                <span className="font-medium">
                                    {user?.first_name} {user?.last_name}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Email
                                </span>
                                <span className="font-medium">
                                    {user?.email}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Role
                                </span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                                    {user?.role}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Status
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${user?.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                    {user?.status || "active"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <Button
                                variant="primary"
                                fullWidth
                                icon={Settings}
                                iconPosition="left"
                                onClick={() => navigate("/profile")}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* Analytics Card */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <BarChart size={24} />
                            Quick Stats
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="text-gray-700">
                                    Books Read This Month
                                </span>
                                <span className="font-bold text-blue-600">
                                    8
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-gray-700">
                                    On-Time Returns
                                </span>
                                <span className="font-bold text-green-600">
                                    95%
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <span className="text-gray-700">
                                    Library Visits
                                </span>
                                <span className="font-bold text-purple-600">
                                    42
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <button
                                className="flex items-center justify-center gap-2 text-primary font-medium w-full hover:text-primary/80"
                                onClick={() => navigate("/analytics")}
                            >
                                View Detailed Analytics
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Dashboard;