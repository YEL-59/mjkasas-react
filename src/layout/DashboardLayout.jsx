import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Menu,
    Home,
    ClipboardList,
    CheckCircle,
    Building2,
    Users,
    Search,
    Bell,
    MessageCircle,
    Plus,
    Settings,
    LogOut,
} from 'lucide-react';
import logo from '@/assets/images/logo.png';

const DashboardLayout = ({ userType = 'manager' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const navigationItems = [
        { name: 'Dashboard', icon: Home, href: '#', active: true },
        { name: 'Work Order', icon: ClipboardList, href: '#' },
        { name: 'Completed Orders', icon: CheckCircle, href: '#' },
        { name: 'Buildings', icon: Building2, href: '#' },
        { name: 'Employees', icon: Users, href: '#' },
        { name: 'Inspection', icon: Search, href: '#' },
        { name: 'Settings', icon: Settings, href: '#' },
    ];

    const handleCreateWorkOrder = () => {
        navigate('/manager/create-work-order');
    };

    const SidebarContent = () => (
        <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="GBRANDS" className="h-8 w-auto" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-6 px-4 overflow-y-auto">
                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${item.active
                                    ? 'bg-blue-50 text-gray-900 border-l-4 border-purple-500'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                <span className="font-medium">{item.name}</span>
                            </a>
                        );
                    })}
                </div>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Log Out
                </Button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Main Layout */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <header className="bg-white shadow-sm border-b px-4 lg:px-6 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="lg:hidden w-8"></div>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search work order, projects, etc..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MessageCircle className="h-5 w-5" />
                            </Button>

                            <div className="hidden sm:flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">Esther Howard</div>
                                    <div className="text-gray-500 capitalize">{userType}</div>
                                </div>
                            </div>

                            <Button
                                onClick={handleCreateWorkOrder}
                                className="bg-[#717171] hover:bg-[#5a5a5a] text-white px-3 lg:px-4 py-2 rounded-lg flex items-center space-x-2"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Create work order</span>
                                <span className="sm:hidden">Create</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content – scrollable */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
