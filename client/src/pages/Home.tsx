import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Library, RefreshCw } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Button from "@/components/Button";
import api from "@/services/api";
import heroBg from "@/assets/images/heroBg.png";

interface Library {
    id: number;
    name: string;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [libraries, setLibraries] = useState<Library[]>([]);
    const [activeLibrary, setActiveLibrary] = useState<Library | null>(null);
    const [loading, setLoading] = useState(true);
    const [switchLoading, setSwitchLoading] = useState<number | null>(null);
    const [user, setUser] = useState<any>(null);

    // Fetch user data
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Set up axios interceptor to add token to requests
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            config => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, []);

    // Fetch user's libraries
    const fetchLibraries = async () => {
        try {
            setLoading(true);
            const response = await api.get("/libraries");

            if (response.data.success) {
                setLibraries(response.data.data.libraries);
                // Find active library
                const active = response.data.data.libraries.find(
                    (lib: Library) => lib.isActive
                );
                setActiveLibrary(active || null);
            }
        } catch (error: any) {
            console.error("Error fetching libraries:", error);
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

    useEffect(() => {
        fetchLibraries();
    }, []);

    // Switch active library
    const switchLibrary = async (libraryId: number) => {
        setSwitchLoading(libraryId);
        try {
            const response = await api.put(`/libraries/${libraryId}/switch`);

            if (response.data.success) {
                setActiveLibrary(response.data.data.library);
                // Update libraries list
                const updatedLibraries = libraries.map(lib => ({
                    ...lib,
                    isActive: lib.id === libraryId
                }));
                setLibraries(updatedLibraries);
            }
        } catch (error: any) {
            console.error("Error switching library:", error);
            alert(
                error.response?.data?.message ||
                    "Failed to switch library. Please try again."
            );
        } finally {
            setSwitchLoading(null);
        }
    };

    // Manage library
    const manageLibrary = (libraryId: number) => {
        navigate(`/library/${libraryId}`);
    };

    if (loading) {
        return (
            <PageLayout>
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading libraries...</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <div>
            {/* Hero Section with Background */}
            <section
                className="relative py-12 md:py-20 min-h-[60vh] flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.90)), url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
                        {/* Library Branding - Left Side */}
                        <div className="flex items-center gap-4">
                            {activeLibrary?.imageUrl ? (
                                <img
                                    src={activeLibrary.imageUrl}
                                    alt={activeLibrary.name}
                                    className="w-20 h-20 rounded-xl object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                                    <Library className="text-white" size={32} />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {activeLibrary?.name || "No Active Library"}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Library Management System
                                </p>
                            </div>
                        </div>

                        {/* Switch Library Button - Top Right */}
                        {libraries.filter(lib => !lib.isActive).length > 0 && (
                            <Button
                                onClick={() => {
                                    const firstInactive = libraries.find(
                                        lib => !lib.isActive
                                    );
                                    if (firstInactive) {
                                        switchLibrary(firstInactive.id);
                                    }
                                }}
                                variant="secondary"
                                size="sm"
                                loading={switchLoading !== null}
                                icon={RefreshCw}
                            >
                                Switch Library
                            </Button>
                        )}
                    </div>

                    {/* Welcome Message - Centered */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to Your Library
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Manage your collection, track borrowings, and
                            oversee all library activities from your centralized
                            dashboard.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content - Only Libraries Overview */}
            <PageLayout description="View your libraries overview and switch between them.">
                <div className="p-6">
                    {/* Switch Library Section */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Available Libraries
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Select a library to activate
                                </p>
                            </div>
                            <button
                                onClick={fetchLibraries}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Refresh libraries"
                            >
                                <RefreshCw
                                    size={18}
                                    className="text-gray-500"
                                />
                            </button>
                        </div>

                        {libraries.length === 0 ? (
                            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                                <Library
                                    size={48}
                                    className="mx-auto text-gray-300 mb-3"
                                />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    No Libraries Yet
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    You don't have any libraries yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {libraries.map(library => (
                                    <div
                                        key={library.id}
                                        className={`
                                            flex items-center justify-between p-4 rounded-lg border transition-colors
                                            ${
                                                library.isActive
                                                    ? "bg-primary/5 border-primary/20"
                                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {library.imageUrl ? (
                                                <img
                                                    src={library.imageUrl}
                                                    alt={library.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                                        library.isActive
                                                            ? "bg-primary/10"
                                                            : "bg-gray-100"
                                                    }`}
                                                >
                                                    <Library
                                                        size={20}
                                                        className={
                                                            library.isActive
                                                                ? "text-primary"
                                                                : "text-gray-400"
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {library.name}
                                                    {library.isActive && (
                                                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                            Active
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    Created{" "}
                                                    {new Date(
                                                        library.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        {!library.isActive && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    switchLibrary(library.id)
                                                }
                                                loading={
                                                    switchLoading === library.id
                                                }
                                            >
                                                Activate
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Libraries Overview Stats */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Libraries Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Total Libraries
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {libraries.length}
                                        </h3>
                                    </div>
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Library
                                            className="text-blue-600"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Active Library
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {activeLibrary ? "✓" : "None"}
                                        </h3>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Library
                                            className="text-green-600"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Available to Switch
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {
                                                libraries.filter(
                                                    lib => !lib.isActive
                                                ).length
                                            }
                                        </h3>
                                    </div>
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <RefreshCw
                                            className="text-purple-600"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default Home;
