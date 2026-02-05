import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import heroBg from "@/assets/images/heroBg.png";
import {
    BookOpen,
    Users,
    BarChart,
    Clock,
    Search,
    Shield,
    Calendar,
    BookCheck,
    FileText,
    ChevronRight,
    Sparkles,
    CheckCircle,
    ArrowRight,
    Library,
    GraduationCap,
    Bell,
    TrendingUp,
    Database,
    Smartphone,
    Cloud,
    Upload,
    FileSpreadsheet,
    Filter,
    Scan,
    QrCode,
    LogIn,
    LogOut,
    DoorOpen,
    Monitor,
    Hash,
    Database as DatabaseIcon,
    ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
    return (
        <div>
            <Header />

            {/* Hero Section - ADDED SAME BACKGROUND AS HOME */}
            <section
                className="relative bg-bgColor py-12 md:py-16 border-b border-gray-200 min-h-[40vh] flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.90)), url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            Detailed Feature Overview
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Learn How Our System
                            <span className="text-primary block">Works</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Discover how each feature of our library management
                            system can transform your operations and enhance
                            efficiency.
                        </p>
                        <Button
                            as={Link}
                            to="/signup"
                            variant="primary"
                            size="lg"
                            icon={ArrowRight}
                            iconPosition="right"
                        >
                            Try It Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Book Management Section */}
            <section
                id="book-management"
                className="min-h-screen bg-white py-20 flex items-center"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                <Library size={16} />
                                Feature 1
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Book Management
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Efficiently organize and manage your entire book
                                collection with our comprehensive management
                                system.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <BookOpen
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Add Books Individually
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Add books one by one with detailed
                                            information including title, author,
                                            ISBN, genre, publication year, and
                                            location.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Upload
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Batch Import via CSV/Excel
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Import multiple books at once by
                                            uploading CSV or Excel files. Ensure
                                            your file headers match our database
                                            fields:
                                        </p>
                                        <ul className="mt-2 space-y-1 text-sm text-gray-500">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                ISBN, Title, Author
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Publisher, Publication Year
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Genre, Location, Quantity
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Status, Condition
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <Button
                                as={Link}
                                to="/signup"
                                variant="primary"
                                className="mt-6"
                            >
                                Start Managing Your Books
                            </Button>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <FileSpreadsheet
                                            className="text-primary"
                                            size={24}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Import File Requirements
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            Required Fields:
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="bg-white p-2 rounded border">
                                                isbn
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                title
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                author
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                publisher
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                publication_year
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                genre
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            Optional Fields:
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="bg-white p-2 rounded border">
                                                location
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                quantity
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                description
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                cover_image
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Management Section - UPDATED WITH middle_name and course */}
            <section
                id="student-management"
                className="min-h-screen bg-bgColor py-20 flex items-center"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <GraduationCap
                                            className="text-primary"
                                            size={24}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Student Database Structure
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            Required Fields:
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="bg-white p-2 rounded border">
                                                student_id
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                first_name
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                last_name
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                email
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                grade_level
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                section
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                middle_name
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                course
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                <Users size={16} />
                                Feature 2
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Student Management
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Manage student information efficiently with our
                                comprehensive student management system.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Users
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Individual Student Registration
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Add students one by one with
                                            complete information including ID
                                            number, name (first, middle, last),
                                            contact details, grade level,
                                            section, and course.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Upload
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Batch Import Students
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Import student lists via CSV or
                                            Excel files. Ensure your file
                                            contains these required fields:
                                        </p>
                                        <ul className="mt-2 space-y-1 text-sm text-gray-500">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Student ID (Unique)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                First Name, Middle Name, Last
                                                Name
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Email, Phone Number
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                Grade Level, Section, Course
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <Button
                                as={Link}
                                to="/signup"
                                variant="primary"
                                className="mt-6"
                            >
                                Start Managing Students
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Check In/Out Section */}
            <section
                id="check-in-out"
                className="min-h-screen bg-white py-20 flex items-center"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                <BookCheck size={16} />
                                Feature 3
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Smart Check In/Out System
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Streamline your book borrowing and return
                                process with our efficient check in/out system.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Search
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Search Student
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Search for students by ID, name, or
                                            email to begin the checkout process.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Scan
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Scan Book Barcode
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Enter or scan the book's barcode to
                                            add it to the checkout list.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Filter
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Set Due Date
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            The system automatically suggests a
                                            due date based on library policies,
                                            which you can adjust as needed.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <LogOut
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Complete Checkout
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Finalize the transaction and print
                                            or email the receipt to the student.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                as={Link}
                                to="/signup"
                                variant="primary"
                                className="mt-6"
                            >
                                Try Check In/Out System
                            </Button>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <QrCode
                                            className="text-primary"
                                            size={24}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Quick Checkout Process
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-primary/5 rounded-lg border-l-4 border-primary">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            Step-by-Step Workflow:
                                        </h4>
                                        <ol className="space-y-3 text-sm text-gray-600">
                                            <li className="flex items-center gap-3">
                                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    1
                                                </span>
                                                Search and select student
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    2
                                                </span>
                                                Scan book barcode/ISBN
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    3
                                                </span>
                                                Review due date and confirm
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    4
                                                </span>
                                                Generate transaction receipt
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Attendance Tracking Section */}
            <section
                id="attendance-tracking"
                className="min-h-screen bg-bgColor py-20 flex items-center"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <Monitor
                                            className="text-primary"
                                            size={24}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Dedicated Attendance Station
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-green-50 to-primary/5 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            Setup Instructions:
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                                />
                                                Install a dedicated computer at
                                                library entrance
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                                />
                                                Access /attendance route on the
                                                system
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                                />
                                                Students enter their ID number
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                                />
                                                System automatically records
                                                time-in
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                <Clock size={16} />
                                Feature 4
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Attendance Tracking System
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Automatically track student library attendance
                                with our dedicated attendance system.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <DoorOpen
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Dedicated Attendance Route
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Set up a dedicated computer at the
                                            library entrance with access to the
                                            /attendance route.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Hash
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Student ID Entry
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Students enter their ID number on
                                            the attendance interface.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <DatabaseIcon
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Automatic Recording
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            The system automatically records the
                                            time-in with student details and
                                            stores it in the database.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <BarChart
                                            className="text-primary"
                                            size={20}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Attendance Reports
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Generate attendance reports by date
                                            range, student, or class section for
                                            monitoring and analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="primary"
                                >
                                    Set Up Attendance System
                                </Button>
                                <Button
                                    as={Link}
                                    to="/"
                                    variant="outline"
                                    icon={ArrowLeft}
                                    iconPosition="left"
                                >
                                    Back to Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LearnMore;
