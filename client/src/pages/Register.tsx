import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    UserPlus,
    User,
    Mail,
    Lock,
    AlertCircle,
    Sparkles,
    Eye,
    EyeOff
} from "lucide-react";
import authBg from "@/assets/images/authImage.png";
import heroBg from "@/assets/images/heroBg.png";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simple validation
        if (!formData.first_name.trim() || !formData.last_name.trim()) {
            setError("First name and last name are required");
            setLoading(false);
            return;
        }

        if (!formData.email.trim()) {
            setError("Email is required");
            setLoading(false);
            return;
        }

        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (!formData.password) {
            setError("Password is required");
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Prepare data for API (remove confirmPassword)
            const { confirmPassword, ...registrationData } = formData;

            // Use the api instance directly
            const response = await api.post("/auth/register", registrationData);

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );

                // Redirect based on role
                const role = response.data.data.user.role;
                if (role === "admin" || role === "superadmin") {
                    navigate("/home");
                } else {
                    navigate("/profile");
                }
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.90)), url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Header />

            <main className="flex-1 py-12 min-h-screen px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Welcome Message with Background Image */}
                        <div
                            className="relative rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center p-8"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.9)), url(${authBg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            <div className="relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <Sparkles size={16} />
                                    Get Started
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                    Join
                                    <span className="font-logo text-primary block">
                                        SilidAklatan
                                        <span className="text-secondary">
                                            PH
                                        </span>
                                    </span>
                                </h1>

                                <p className="text-lg mb-6 text-gray-700 max-w-lg mx-auto">
                                    Create your account to access your library
                                    management dashboard and start streamlining
                                    your library operations.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Registration Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Create Your Account
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Fill in your details to get started
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
                                    <AlertCircle size={20} />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Registration Form */}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* First Name Field */}
                                    <div>
                                        <label
                                            htmlFor="first_name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            First Name *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                            <input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                required
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                                placeholder="John"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name Field */}
                                    <div>
                                        <label
                                            htmlFor="last_name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Last Name *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                            <input
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                required
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                                placeholder="Doe"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                                placeholder="you@example.com"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                                placeholder="••••••••"
                                                disabled={loading}
                                            />
                                            {/* Eye Icon Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <EyeOff
                                                        className="text-gray-400 hover:text-gray-600"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="text-gray-400 hover:text-gray-600"
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Password must be at least 8
                                            characters
                                        </p>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                                placeholder="••••••••"
                                                disabled={loading}
                                            />
                                            {/* Eye Icon Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff
                                                        className="text-gray-400 hover:text-gray-600"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="text-gray-400 hover:text-gray-600"
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    icon={UserPlus}
                                    iconPosition="left"
                                    loading={loading}
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Already have an account?
                                        </span>
                                    </div>
                                </div>

                                {/* Login Link */}
                                <div className="text-center">
                                    <Link
                                        to="/signin"
                                        className="inline-flex items-center text-primary font-medium hover:text-primary/80"
                                    >
                                        Sign in to your account
                                        <span className="ml-1">→</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Register;
