import { ReactNode } from "react";
import BreadCrumb from "@/components/BreadCrumb";

interface PageLayoutProps {
    children: ReactNode;
    description?: string;
    actions?: ReactNode;
}

const PageLayout = ({ children, description, actions }: PageLayoutProps) => {
    return (
        <div className="p-6">
            {/* Page Header */}
            {(description || actions) && (
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            {/* Breadcrumb added here */}
                            <BreadCrumb />
                            {description && (
                                <p className="text-gray-600 mt-1">{description}</p>
                            )}
                        </div>
                        {actions && (
                            <div className="flex items-center gap-2">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Page Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;