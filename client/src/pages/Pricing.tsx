import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import heroBg from "@/assets/images/heroBg.png";
import {
    CheckCircle,
    XCircle,
    Star,
    Sparkles,
    Users,
    BookOpen,
    Clock,
    Library,
    Zap,
    TrendingUp,
    Shield,
    ArrowRight,
    HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
    const plans = [
        {
            name: "Basic",
            price: "₱0",
            period: "per month",
            description: "Perfect for small libraries getting started",
            discount: null,
            features: [
                { text: "1 Library", included: true },
                { text: "200 Books Capacity", included: true },
                { text: "500 Students Capacity", included: true },
                { text: "Basic Reports", included: true },
                { text: "Check In/Out Feature", included: true },
                { text: "Manual In/Out System", included: true },
                { text: "Attendance Tracking", included: false },
                { text: "Batch Import (CSV/Excel)", included: false },
                { text: "Priority Support", included: false }
            ],
            buttonVariant: "outline" as const,
            popular: false
        },
        {
            name: "Standard",
            price: "₱360",
            period: "per month",
            description: "Best for growing libraries with multiple branches",
            discount: "Save ₱40 (10% off)",
            originalPrice: "₱400",
            features: [
                { text: "2 Libraries", included: true },
                { text: "1,500 Books per Library", included: true },
                { text: "2,000 Students per Library", included: true },
                { text: "Advanced Reports", included: true },
                { text: "Smart Check In/Out System", included: true },
                { text: "Attendance Tracking System", included: true },
                { text: "Batch Import (CSV/Excel)", included: true },
                { text: "Email Support", included: true },
                { text: "Priority Support", included: false }
            ],
            buttonVariant: "primary" as const,
            popular: true
        },
        {
            name: "Premium",
            price: "₱750",
            period: "per month",
            description: "Enterprise solution for large institutions",
            discount: "Best value",
            features: [
                { text: "5 Libraries", included: true },
                { text: "Unlimited Books", included: true },
                { text: "Unlimited Students", included: true },
                { text: "Comprehensive Reports", included: true },
                { text: "Smart Check In/Out System", included: true },
                { text: "Attendance Tracking System", included: true },
                { text: "Batch Import (CSV/Excel)", included: true },
                { text: "Priority Support", included: true },
                { text: "Custom Feature Development", included: true }
            ],
            buttonVariant: "secondary" as const,
            popular: false
        }
    ];

    const comparisonFeatures = [
        {
            category: "Library Capacity",
            items: [
                {
                    name: "Number of Libraries",
                    basic: "1",
                    standard: "2",
                    premium: "5"
                },
                {
                    name: "Book Capacity",
                    basic: "200 books",
                    standard: "1,500 per library",
                    premium: "Unlimited"
                },
                {
                    name: "Student Capacity",
                    basic: "500 students",
                    standard: "2,000 per library",
                    premium: "Unlimited"
                }
            ]
        },
        {
            category: "Core Features",
            items: [
                {
                    name: "Check In/Out System",
                    basic: true,
                    standard: true,
                    premium: true
                },
                {
                    name: "Reports Feature",
                    basic: true,
                    standard: true,
                    premium: true
                },
                {
                    name: "In/Out System",
                    basic: "Manual",
                    standard: "Smart System",
                    premium: "Smart System"
                },
                {
                    name: "Attendance Tracking",
                    basic: false,
                    standard: true,
                    premium: true
                },
                {
                    name: "Batch Import",
                    basic: false,
                    standard: true,
                    premium: true
                }
            ]
        },
        {
            category: "Support & Customization",
            items: [
                {
                    name: "Email Support",
                    basic: true,
                    standard: true,
                    premium: true
                },
                {
                    name: "Priority Support",
                    basic: false,
                    standard: false,
                    premium: true
                },
                {
                    name: "Custom Development",
                    basic: false,
                    standard: false,
                    premium: true
                }
            ]
        }
    ];

    return (
        <div>
            <Header />

            {/* Hero Section - UPDATED WITH heroBg */}
            <section
                className="relative bg-bgColor py-16 md:py-24 min-h-[50vh] flex items-center"
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
                            Simple, Transparent Pricing
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Choose the Perfect Plan
                            <span className="text-primary block">
                                for Your Library
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Select a plan that grows with your library. All
                            plans include core features with no hidden fees.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-3xl border-2 ${plan.popular ? "border-primary shadow-2xl" : "border-gray-200 shadow-lg"} p-8 transition-all hover:shadow-xl`}
                            >
                                {/* Plan Name at the Top */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {plan.name}
                                    </h3>
                                </div>

                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-1.5 rounded-full text-sm font-semibold">
                                            <Star size={14} fill="white" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                {plan.discount && (
                                    <div className="absolute -top-3 -right-3">
                                        <div className="bg-secondary text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
                                            {plan.discount}
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        {plan.name === "Standard" && (
                                            <Zap
                                                size={20}
                                                className="text-primary"
                                            />
                                        )}
                                        {plan.name === "Premium" && (
                                            <TrendingUp
                                                size={20}
                                                className="text-secondary"
                                            />
                                        )}
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-5xl font-bold text-gray-900">
                                                {plan.price}
                                            </span>
                                            <span className="text-gray-500">
                                                {plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    {plan.originalPrice && (
                                        <div className="mb-4">
                                            <span className="text-gray-400 line-through">
                                                {plan.originalPrice}
                                            </span>
                                            <span className="ml-2 text-green-600 font-semibold">
                                                per month
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-gray-600">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-900 mb-4">
                                        What's included:
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3"
                                            >
                                                {feature.included ? (
                                                    <CheckCircle
                                                        size={18}
                                                        className="text-green-500 flex-shrink-0 mt-0.5"
                                                    />
                                                ) : (
                                                    <XCircle
                                                        size={18}
                                                        className="text-gray-300 flex-shrink-0 mt-0.5"
                                                    />
                                                )}
                                                <span
                                                    className={`${feature.included ? "text-gray-700" : "text-gray-400"}`}
                                                >
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant={plan.buttonVariant}
                                    fullWidth
                                    size="lg"
                                    icon={ArrowRight}
                                    iconPosition="right"
                                >
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-16 bg-bgColor">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Plan Comparison
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                See how our plans stack up against each other
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            {/* Plan Name Headers */}
                            <div className="grid grid-cols-4 bg-gray-50 p-6">
                                <div className="font-bold text-gray-900">
                                    Features
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">
                                        Basic
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ₱0/month
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">
                                        Standard
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ₱360/month
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900">
                                        Premium
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ₱750/month
                                    </div>
                                </div>
                            </div>

                            {comparisonFeatures.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                    <div className="bg-primary/5 p-4">
                                        <h3 className="font-bold text-gray-900">
                                            {section.category}
                                        </h3>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {section.items.map(
                                            (item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="grid grid-cols-4 p-6 hover:bg-gray-50"
                                                >
                                                    <div className="font-medium text-gray-700">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-center">
                                                        {typeof item.basic ===
                                                        "boolean" ? (
                                                            item.basic ? (
                                                                <CheckCircle
                                                                    className="text-green-500 mx-auto"
                                                                    size={20}
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    className="text-gray-300 mx-auto"
                                                                    size={20}
                                                                />
                                                            )
                                                        ) : (
                                                            <span className="font-medium text-gray-900">
                                                                {item.basic}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        {typeof item.standard ===
                                                        "boolean" ? (
                                                            item.standard ? (
                                                                <CheckCircle
                                                                    className="text-green-500 mx-auto"
                                                                    size={20}
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    className="text-gray-300 mx-auto"
                                                                    size={20}
                                                                />
                                                            )
                                                        ) : (
                                                            <span className="font-medium text-gray-900">
                                                                {item.standard}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        {typeof item.premium ===
                                                        "boolean" ? (
                                                            item.premium ? (
                                                                <CheckCircle
                                                                    className="text-green-500 mx-auto"
                                                                    size={20}
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    className="text-gray-300 mx-auto"
                                                                    size={20}
                                                                />
                                                            )
                                                        ) : (
                                                            <span className="font-medium text-gray-900">
                                                                {item.premium}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600">
                                Get answers to common questions about our
                                pricing and plans
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: "Can I switch plans at any time?",
                                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
                                },
                                {
                                    question: "Is there a long-term contract?",
                                    answer: "No, all our plans are month-to-month. You can cancel anytime with no long-term commitment."
                                },
                                {
                                    question:
                                        "What happens if I exceed my book or student limit?",
                                    answer: "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or contact us for custom solutions."
                                },
                                {
                                    question:
                                        "Do you offer discounts for educational institutions?",
                                    answer: "Yes, we offer special pricing for schools and educational institutions. Contact our sales team for more information."
                                },
                                {
                                    question:
                                        "What payment methods do you accept?",
                                    answer: "We accept all major credit cards, PayPal, and bank transfers for Philippine customers."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-xl p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <HelpCircle
                                            className="text-primary mt-0.5 flex-shrink-0"
                                            size={20}
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">
                                                {faq.question}
                                            </h4>
                                            <p className="text-gray-600">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Your Library?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Start your 14-day free trial today. No credit card
                        required.
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
                            className="border-2 border-white text-primary hover:bg-white/10 hover:text-white"
                        >
                            Learn More About Features
                        </Button>
                    </div>
                    <p className="mt-6 text-white/70 text-sm">
                        All plans include 14-day free trial • No setup fees •
                        Cancel anytime
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;
