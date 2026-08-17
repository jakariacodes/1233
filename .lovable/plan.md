# E-commerce System Implementation Plan

This plan implements a full e-commerce system for digital services, including dynamic service management, a premium checkout flow, and a user dashboard.

## User-Facing Changes
- **Dynamic Services & Pricing**: All services and pricing packages will be managed from the admin panel.
- **"Order Now" System**: "Get Started" buttons replaced with direct order functionality.
- **Premium Checkout**: A multi-step checkout form capturing customer details (name, country, phone, address).
- **User Accounts**: Automatic account creation during checkout. Users can track order status and manage their profile.
- **User Dashboard**: A dedicated space for customers to see their active services, order history, and subscription status.
- **Admin Order Management**: Admins can approve/reject orders and update delivery status.

## Technical Details

### 1. Database Schema
- **`services`**: Stores main service categories (Web Design, SEO, etc.).
- **`service_packages`**: Stores pricing tiers for each service (Basic, Pro, etc.).
- **`orders`**: Links users to packages, stores payment status and customer info.
- **`profiles`**: Extended to store customer details (first/last name, country, etc.) and approval status.

### 2. Admin Panel Updates
- **Services CRUD**: New management interface for services and packages.
- **Enhanced Orders**: Improved order list with filters and status controls.
- **User Approval**: Interface for admins to review and approve new customer accounts.

### 3. Authentication & Routing
- **Public Routes**: Services, Pricing, Auth.
- **Protected User Routes**: Dashboard, Profile, Checkout.
- **Protected Admin Routes**: All existing admin management paths.
- **Hidden Admin Login**: Admin access remains behind a separate/hidden flow while the main navbar focuses on users.

### 4. Integration
- Using **Lovable Cloud** for persistent storage and authentication.
- **Framer Motion** for premium animations in the checkout and dashboard.
- **TanStack Start** for efficient data loading and server-side logic.
