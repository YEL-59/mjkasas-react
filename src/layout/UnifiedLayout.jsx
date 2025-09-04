import React, { useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Menu,
    Home,
    ClipboardList,
    CheckCircle,
    Eye,
    MessageCircle,
    Search,
    Bell,
    Plus,
    Settings,
    LogOut,
    MoreVertical,
    User,
    ChevronRight,
    ChevronLeft,
    Building,
    Users,
} from "lucide-react";
import logo from "@/assets/images/logo.png";
import Lightincon from "@/assets/svg/light";

const UnifiedLayout = () => {
    const { userRole, logout } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Dynamic configuration based on user role
    const getRoleConfig = () => {
        switch (userRole) {
            case "technician":
                return {
                    basePath: "/technician",
                    userInfo: {
                        name: "John Doe",
                        role: "Technician",
                        email: "john.doe@example.com"
                    },
                    navigationItems: [
                        { name: "Dashboard", icon: Home, href: "/technician" },
                        { name: "Work Order", icon: ClipboardList, href: "/technician/work-order" },
                        { name: "Completed Orders", icon: CheckCircle, href: "/technician/completed-orders" },
                        { name: "Inspection", icon: Eye, href: "/technician/inspection" },
                        { name: "Settings", icon: MessageCircle, href: "/technician/settings" },
                    ],
                    showCreateInspection: false,
                    headerTitle: "Technician Dashboard"
                };

            case "manager":
            default:
                return {
                    basePath: "/",
                    userInfo: {
                        name: "John Doe",
                        role: "Manager",
                        email: "john.doe@example.com"
                    },
                    navigationItems: [
                        { name: "Dashboard", icon: Home, href: "/" },
                        { name: "Work Order", icon: ClipboardList, href: "/work-order" },
                        { name: "Completed Orders", icon: CheckCircle, href: "/completed-orders" },
                        { name: "Buildings", icon: Building, href: "/buildings" },
                        { name: "Employees", icon: Users, href: "/employees" },
                        { name: "Inspection", icon: Eye, href: "/inspection" },
                        { name: "Settings", icon: MessageCircle, href: "/settings" },
                    ],
                    showCreateInspection: true,
                    headerTitle: "Manager Dashboard"
                };
        }
    };

    const roleConfig = getRoleConfig();

    // Mock notification data
    const notifications = [
        {
            id: 1,
            title: "New Work Order Assigned",
            description: "HVAC Repair at Greenpoint Plaza has been assigned to you.",
            time: "5m ago",
            isRead: false
        },
        {
            id: 2,
            title: "Task Completed",
            description: "Lighting maintenance at Building B has been completed.",
            time: "1h ago",
            isRead: false
        },
        {
            id: 3,
            title: "Equipment Update",
            description: "New tools have been added to your inventory.",
            time: "2h ago",
            isRead: true
        }
    ];

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const SidebarContent = () => (
        <div className={`bg-[#F9FAFB] shadow-lg border-r h-screen flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Logo */}
            <div className="p-6 ">
                <div className="flex items-center justify-between">
                    {!isSidebarCollapsed && (
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="GBRANDS" className="h-8 w-auto" />
                        </div>
                    )}
                    {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button> */}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-6 px-4 overflow-y-auto">
                <div className="space-y-2">
                    {roleConfig.navigationItems.map((item) => {
                        const Icon = item.icon;
                        let isActive = false;

                        if (item.href === roleConfig.basePath) {
                            isActive = location.pathname === roleConfig.basePath;
                        } else {
                            isActive = location.pathname.startsWith(item.href);
                        }

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-purple-50 text-gray-900 border-l-4 border-[#643DFF]"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                {!isSidebarCollapsed && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    onClick={logout}
                    className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    {!isSidebarCollapsed && <span>Log Out</span>}
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
                <header className="bg-[#F9FAFB]  border-b px-4 lg:px-6 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="lg:hidden w-8"></div>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Search work order..."
                                    className="w-full pl-10 pr-4 py-2 border-0 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {/* Notification Bell */}
                            <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative bg-transparent border border-[#EAECF0] hover:bg-gray-200 rounded-full p-5">
                                        <Bell className="h-5 w-5" />
                                        {/* {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                                        )} */}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b">
                                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        <button className="text-sm text-blue-600 hover:text-blue-700">
                                            Mark all as read
                                        </button>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <Lightincon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {notification.title}
                                                            </p>
                                                            <span className="text-xs text-gray-500">
                                                                {notification.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-4 border-t text-center">
                                        <button className="text-sm text-blue-600 hover:text-blue-700">
                                            View all notifications
                                        </button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* + Create Inspection Button (only for managers) */}
                            {/* {roleConfig.showCreateInspection && (
                                <Button
                                    onClick={() => navigate('/inspection/create')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Create Inspection</span>
                                </Button>
                            )} */}

                            {/* User Profile Section */}
                            <div className="hidden sm:flex items-center space-x-3">
                                {/* Profile Picture */}
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>

                                {/* User Info */}
                                <div className="text-sm">
                                    <div className="font-bold text-gray-900">{roleConfig.userInfo.name}</div>
                                    <div className="text-gray-500">{roleConfig.userInfo.role}</div>
                                </div>

                                {/* Dropdown Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{roleConfig.userInfo.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {roleConfig.userInfo.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={logout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Mobile Menu */}
                            <div className="sm:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                                                    <User className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{roleConfig.userInfo.name}</p>
                                                    <p className="text-xs leading-none text-muted-foreground">{roleConfig.userInfo.role}</p>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={logout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content – scrollable */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UnifiedLayout;
