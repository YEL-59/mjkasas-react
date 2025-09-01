# 🎯 Unified Layout System

## Overview
This project now uses a **single, unified layout system** instead of separate `DashboardLayout` and `TechnicianLayout` components. The layout dynamically adapts based on the user's role, making it much easier to maintain and extend.

## 🏗️ Architecture

### 1. **UnifiedLayout Component** (`src/layout/UnifiedLayout.jsx`)
- **Single Layout**: One component handles both manager and technician dashboards
- **Dynamic Configuration**: Automatically adapts navigation, user info, and features based on role
- **Role-Based Rendering**: Shows/hides features like "Create Inspection" button based on permissions

### 2. **User Context** (`src/context/UserContext.jsx`)
- **Global State Management**: Manages user role and information across the app
- **Role Switching**: Handles login/logout and role changes
- **Persistent State**: Maintains user role during navigation

### 3. **Router Configuration** (`src/routes/router.jsx`)
- **Simplified Routes**: Both `/` and `/technician` use the same `UnifiedLayout`
- **Role-Based Navigation**: Context determines which navigation items to show
- **Cleaner Structure**: No more duplicate layout definitions

## 🔄 How It Works

### **Role Detection**
```jsx
const { userRole } = useUser(); // Gets role from context
const roleConfig = getRoleConfig(); // Returns role-specific configuration
```

### **Dynamic Navigation**
```jsx
// Manager gets: Dashboard, Work Order, Completed Orders, Buildings, Employees, Inspection, Settings
// Technician gets: Dashboard, Work Order, Completed Orders, Inspection, Settings
const navigationItems = roleConfig.navigationItems;
```

### **Conditional Features**
```jsx
// Only managers see the "Create Inspection" button
{roleConfig.showCreateInspection && (
  <Button onClick={() => navigate('/inspection/create')}>
    Create Inspection
  </Button>
)}
```

## 🚀 Usage

### **1. Login with Role Selection**
- Go to `/auth/sign-in`
- Select your role (Manager or Technician)
- Enter credentials
- Automatically redirected to appropriate dashboard

### **2. Role-Based Access**
- **Manager**: Full access to all features including Buildings, Employees, Create Inspection
- **Technician**: Limited access to Work Orders, Completed Orders, Inspection

### **3. Automatic Layout Switching**
- Navigation automatically adapts to your role
- Sidebar shows only relevant menu items
- Header displays appropriate user information

## 🎨 Benefits

### **Before (Separate Layouts)**
- ❌ **2 separate layout files** (DashboardLayout.jsx, TechnicianLayout.jsx)
- ❌ **Duplicate code** (header, sidebar, notifications)
- ❌ **Hard to maintain** (changes needed in multiple places)
- ❌ **Inconsistent behavior** (different implementations)

### **After (Unified Layout)**
- ✅ **Single layout file** (UnifiedLayout.jsx)
- ✅ **No code duplication** (shared components and logic)
- ✅ **Easy to maintain** (one place to make changes)
- ✅ **Consistent behavior** (same implementation for both roles)
- ✅ **Easy to extend** (add new roles by updating config)

## 🔧 Adding New Roles

### **1. Update Role Configuration**
```jsx
case "admin":
  return {
    basePath: "/admin",
    userInfo: { name: "Admin User", role: "Administrator" },
    navigationItems: [
      { name: "Dashboard", icon: Home, href: "/admin" },
      { name: "System Settings", icon: Settings, href: "/admin/settings" },
      // ... more items
    ],
    showCreateInspection: true,
    headerTitle: "Admin Dashboard"
  };
```

### **2. Add Route**
```jsx
{
  path: '/admin',
  element: <UnifiedLayout />, // Same component, different role
  children: [
    // ... admin-specific routes
  ]
}
```

### **3. Update Context**
```jsx
const [userRole, setUserRole] = useState('admin');
```

## 📁 File Structure

```
src/
├── layout/
│   ├── UnifiedLayout.jsx          # 🎯 Single layout for all roles
│   ├── dashboard/                  # ❌ No longer needed
│   └── technician/                 # ❌ No longer needed
├── context/
│   └── UserContext.jsx            # 🔐 Manages user role and state
├── routes/
│   └── router.jsx                 # 🛣️ Simplified routing
└── pages/
    ├── ManagerDashboard/           # 📊 Manager-specific pages
    └── TechnicianDashboard/        # 🔧 Technician-specific pages
```

## 🎉 Key Features

- **🔄 Dynamic Navigation**: Menu items change based on role
- **👤 Role-Based User Info**: Different names, roles, and permissions
- **🔒 Conditional Features**: Show/hide buttons and sections based on role
- **📱 Responsive Design**: Works on all screen sizes
- **🎨 Consistent UI**: Same design language across all roles
- **⚡ Easy Maintenance**: Single source of truth for layout logic

## 🚀 Getting Started

1. **Login**: Go to `/auth/sign-in`
2. **Select Role**: Choose Manager or Technician
3. **Navigate**: Use the sidebar to access role-specific features
4. **Logout**: Click logout to return to login page

The system automatically handles everything else! 🎯
