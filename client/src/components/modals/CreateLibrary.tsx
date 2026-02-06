import { useState } from "react";
import { X, Upload, Library } from "lucide-react";
import Button from "@/components/Button";
import api from "@/services/api";

interface CreateLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (library: any) => void;
}

const CreateLibraryModal = ({
    isOpen,
    onClose,
    onSuccess
}: CreateLibraryModalProps) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: ""
    });
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
        ];
        if (!validTypes.includes(file.type)) {
            setError("Please upload a valid image (JPEG, PNG, GIF, WebP)");
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB");
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", file);

            const response = await api.post("/upload/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: response.data.data.imageUrl
                }));
                setError("");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError("Library name is required");
            return;
        }

        if (formData.name.trim().length < 3) {
            setError("Library name must be at least 3 characters");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/libraries", {
                name: formData.name.trim(),
                imageUrl: formData.imageUrl || null
            });

            if (response.data.success) {
                onSuccess(response.data.data.library);
                // Reset form
                setFormData({ name: "", imageUrl: "" });
                setError("");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create library");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Library className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Create New Library
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Set up your library details
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Library Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Library Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Main Library, School Library"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                disabled={loading}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Choose a descriptive name for your library
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Library Image (Optional)
                            </label>

                            {formData.imageUrl ? (
                                <div className="mb-3">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Library preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData(prev => ({
                                                ...prev,
                                                imageUrl: ""
                                            }))
                                        }
                                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                                    >
                                        Remove image
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                    <input
                                        type="file"
                                        id="library-image"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading || loading}
                                    />
                                    <label
                                        htmlFor="library-image"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            {uploading ? (
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                            ) : (
                                                <Upload
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {uploading
                                                ? "Uploading..."
                                                : "Upload an image"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            JPEG, PNG, GIF or WebP (max 5MB)
                                        </p>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                disabled={!formData.name.trim() || uploading}
                                className="flex-1"
                            >
                                {loading ? "Creating..." : "Create Library"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLibraryModal;
