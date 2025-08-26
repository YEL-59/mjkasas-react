import React, { useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
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
  Building2,
  Users,
  Search,
  Bell,
  MessageCircle,
  Plus,
  Settings,
  LogOut,
  MoreVertical,
  User,
} from "lucide-react";
import logo from "@/assets/images/logo.png";

const DashboardLayout = ({ userType = "manager" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "Urgent Work order",
      description: "HVAC Repair at Greenpoint Plaza requires immediate attention..",
      time: "5m ago",
      isRead: false
    },
    {
      id: 2,
      title: "Urgent Work order",
      description: "HVAC Repair at Greenpoint Plaza requires immediate attention..",
      time: "5m ago",
      isRead: false
    },
    {
      id: 3,
      title: "Urgent Work order",
      description: "HVAC Repair at Greenpoint Plaza requires immediate attention..",
      time: "5m ago",
      isRead: false
    },
    {
      id: 4,
      title: "Urgent Work order",
      description: "HVAC Repair at Greenpoint Plaza requires immediate attention..",
      time: "5m ago",
      isRead: false
    },
    {
      id: 5,
      title: "Urgent Work order",
      description: "HVAC Repair at Greenpoint Plaza requires immediate attention..",
      time: "5m ago",
      isRead: false
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Work Order", icon: ClipboardList, href: "/work-order" },
    { name: "Completed Orders", icon: CheckCircle, href: "/completed-orders" },
    { name: "Buildings", icon: Building2, href: "/buildings" },
    { name: "Employees", icon: Users, href: "/employees" },
    { name: "Inspection", icon: Search, href: "/inspection" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const handleCreateWorkOrder = () => {
    navigate("/manager/create-work-order");
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
            let isActive = false;

            if (item.href === "/") {
              isActive = location.pathname === "/";
            } else if (item.href === "/work-order") {
              isActive = location.pathname === "/work-order";
            } else if (item.href === "/completed-orders") {
              isActive = location.pathname === "/completed-orders";
            } else if (item.href === "/buildings") {
              isActive = location.pathname === "/buildings";
            } else if (item.href === "/employees") {
              isActive = location.pathname === "/employees";
            } else if (item.href === "/inspection") {
              isActive = location.pathname === "/inspection";
            } else if (item.href === "/settings") {
              isActive = location.pathname === "/settings";
            } else {
              isActive = location.pathname === item.href;
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                  ? "bg-blue-50 text-gray-900 border-l-4 border-purple-500"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
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
                <Input
                  type="text"
                  placeholder="Search work order..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Notification Bell */}
              <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative bg-gray-100 hover:bg-gray-200 rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    )}
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
                          <Bell className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
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

              {/* User Profile Section */}
              <div className="hidden sm:flex items-center space-x-3">
                {/* Profile Picture */}
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>

                {/* User Info */}
                <div className="text-sm">
                  <div className="font-bold text-gray-900">Esther Howard</div>
                  <div className="text-gray-500">Employee</div>
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
                        <p className="text-sm font-medium leading-none">Esther Howard</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          esther.howard@example.com
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
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
                          <p className="text-sm font-medium leading-none">Esther Howard</p>
                          <p className="text-xs leading-none text-muted-foreground">Employee</p>
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
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
