import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Construction, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we're in a dashboard context
    const isInDashboard = location.pathname.includes('/work-order') ||
        location.pathname.includes('/completed-orders') ||
        location.pathname.includes('/buildings') ||
        location.pathname.includes('/employees') ||
        location.pathname.includes('/inspection') ||
        location.pathname.includes('/settings');

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // If it's a standalone 404 (not in dashboard), show full page
    if (!isInDashboard) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Construction className="w-12 h-12 text-purple-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                        <p className="text-gray-600">
                            The page you're looking for doesn't exist or is under construction.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleGoHome}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go to Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleGoBack}
                            className="w-full"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // If it's within dashboard, show compact version
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Construction className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Under Construction</h2>
                    <p className="text-gray-600 mb-6">
                        This feature is currently being developed. Please check back soon!
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={handleGoHome}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleGoBack}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
