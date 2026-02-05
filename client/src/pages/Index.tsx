import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import heroBg from "@/assets/images/heroBg.png";
import feature1 from "@/assets/images/feature1.png";
import feature2 from "@/assets/images/feature2.png";
import feature3 from "@/assets/images/feature3.png";
import feature4 from "@/assets/images/feature4.png";
import {
    ArrowRight,
    BookOpen,
    Users,
    BarChart,
    Clock,
    Search,
    Shield,
    Calendar,
    BookCheck,
    UserCheck,
    FileText,
    ChevronRight,
    Sparkles,
    CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Header />

            {/* Hero Section - FIXED GRADIENT */}
            <section
                className="relative bg-bgColor py-20 md:py-32 min-h-[calc(100vh-80px)] flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.90)), url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Sparkles size={18} />
                                <span>Modern Library Solution</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Efficient Library
                                <span className="text-primary block mt-2">
                                    Management System
                                </span>
                            </h1>
                            
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Streamline your library operations with our intelligent platform. 
                                Manage books, students, checkouts, and generate insightful reports—all 
                                in one modern interface designed for Philippine schools and libraries.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="primary"
                                    size="lg"
                                    icon={ArrowRight}
                                    iconPosition="right"
                                    className="shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    Get Started Free
                                </Button>
                                <Button
                                    as={Link}
                                    to="/pricing"
                                    variant="outline"
                                    size="lg"
                                >
                                    View Pricing Plans
                                </Button>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-6 pt-12">
                                {[
                                    { icon: Users, text: "Student Management" },
                                    { icon: BookCheck, text: "Smart Check In/Out" },
                                    { icon: BarChart, text: "Real-time Analytics" },
                                    { icon: Shield, text: "Secure & Compliant" }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <item.icon
                                                className="text-primary"
                                                size={18}
                                            />
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl">
                                    <UserCheck className="text-primary" size={28} />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl">
                                    <Clock className="text-primary" size={28} />
                                </div>
                                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-primary/10 p-2 rounded-xl">
                                            <Sparkles className="text-primary" size={24} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            Why Choose Our System
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                icon: BookOpen,
                                                text: "Digital Book Catalog",
                                                desc: "Cloud-based catalog management"
                                            },
                                            {
                                                icon: Calendar,
                                                text: "Smart Scheduling",
                                                desc: "Automated time tracking"
                                            },
                                            {
                                                icon: FileText,
                                                text: "Automated Reports",
                                                desc: "Export-ready analytics"
                                            },
                                            {
                                                icon: Shield,
                                                text: "Secure Database",
                                                desc: "Encrypted & compliant"
                                            }
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                            >
                                                <item.icon
                                                    className="text-primary mt-0.5"
                                                    size={20}
                                                />
                                                <div>
                                                    <span className="text-gray-800 font-medium block">
                                                        {item.text}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Updated with proper Learn More links */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Sparkles size={16} />
                            Powerful Features
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Complete Library Management
                            <span className="text-primary block">Solution</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Everything you need to efficiently manage your
                            library operations with modern tools and intuitive
                            design
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Book Management",
                                description:
                                    "Create your digital library, import books, and organize your collection with advanced categorization.",
                                image: feature1,
                                color: "bg-blue-500",
                                link: "/learn-more#book-management"
                            },
                            {
                                title: "Student Management",
                                description:
                                    "Register students, manage profiles, and track borrowing history with detailed insights.",
                                image: feature2,
                                color: "bg-blue-500",
                                link: "/learn-more#student-management"
                            },
                            {
                                title: "Smart Check In/Out",
                                description:
                                    "Quick book checkout and return process with automated notifications and reminders.",
                                image: feature3,
                                color: "bg-blue-500",
                                link: "/learn-more#check-in-out"
                            },
                            {
                                title: "Attendance Tracking",
                                description:
                                    "Monitor student time in/time out in the library with real-time logging and analytics.",
                                image: feature4,
                                color: "bg-blue-500",
                                link: "/learn-more#attendance-tracking"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                            >
                                <div className={`h-2 ${feature.color}`}></div>
                                <div className="p-6">
                                    <div className="mb-4 overflow-hidden rounded-xl">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {feature.description}
                                    </p>
                                    <Link
                                        to={feature.link}
                                        className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all"
                                    >
                                        Learn more
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reports & Analytics Section */}
            <section className="py-20 bg-bgColor">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-2 rounded-xl">
                                        <BarChart className="text-primary" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Comprehensive Analytics
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Borrowing statistics and trends",
                                        "Student activity reports",
                                        "Book utilization analytics",
                                        "Overdue book tracking",
                                        "Library attendance reports",
                                        "Inventory management insights"
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <BarChart size={16} />
                                Smart Analytics
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Advanced Reporting & Insights
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Generate detailed reports on library usage,
                                student activities, and book circulation. Make
                                data-driven decisions with our comprehensive
                                analytics dashboard.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    {
                                        icon: FileText,
                                        text: "Export reports in multiple formats (PDF, Excel, CSV)",
                                        subtext: "Share insights with stakeholders easily"
                                    },
                                    {
                                        icon: Calendar,
                                        text: "Monthly and yearly analytics dashboards",
                                        subtext: "Track performance over time"
                                    },
                                    {
                                        icon: Search,
                                        text: "Advanced search and filtering options",
                                        subtext: "Find exactly what you need"
                                    }
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        <item.icon
                                            className="text-primary mt-0.5"
                                            size={20}
                                        />
                                        <div>
                                            <span className="text-gray-800 font-medium block">
                                                {item.text}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                {item.subtext}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                        <Sparkles size={16} />
                        Join Thousands of Libraries
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
                        Transform Your Library Management Today
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join schools and libraries across the Philippines using
                        our efficient and modern management system
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            as={Link}
                            to="/signup"
                            variant="secondary"
                            size="lg"
                            icon={ArrowRight}
                            iconPosition="right"
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            as={Link}
                            to="/learn-more"
                            variant="outline"
                            size="lg"
                            icon={ChevronRight}
                            iconPosition="right"
                            className="border-2 border-white text-primary hover:bg-white/10 hover:text-white"
                        >
                            See All Features
                        </Button>
                    </div>
                    <p className="mt-6 text-white/70 text-sm">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;