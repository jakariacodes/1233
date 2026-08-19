import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Menu, X, ShoppingCart, MessageSquare, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Menu, X, ShoppingCart, MessageSquare, Users, Bell } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
    { icon: Briefcase, label: "Portfolio", href: "/admin/portfolio" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Users, label: "Team", href: "/admin/team" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-secondary/30 dark:bg-[#000d0b] flex font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 glass-sidebar transform transition-transform duration-500 lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        <div className="p-8 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              N
            </div>
            <div>
              <span className="font-display font-bold text-xl block tracking-tight">NextOnline</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Admin Panel</span>
            </div>
          </Link>

          <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href as any}
                className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-300 group relative overflow-hidden"
                activeProps={{ className: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary hover:text-primary-foreground" }}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-semibold tracking-tight">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-8 border-t border-border/50 space-y-3">
             <div className="px-4 py-4 rounded-2xl bg-secondary/50 border border-border/50 mb-4">
                <p className="text-xs text-muted-foreground font-medium mb-1">Logged in as</p>
                <p className="text-sm font-bold truncate">{user?.email}</p>
             </div>
             <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-colors duration-300 px-4 py-6" onClick={handleSignOut}>
                <LogOut className="w-5 h-5 mr-4" />
                <span className="font-semibold">Sign Out</span>
             </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="bg-white/80 dark:bg-[#011612]/80 backdrop-blur-xl border-b border-border/50 h-20 sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between">
           <button className="lg:hidden p-2 hover:bg-secondary rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
           
           <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-3 py-1 rounded-full">Production Mode</span>
           </div>

           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-md">
                 {user?.email?.charAt(0).toUpperCase()}
              </div>
           </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-10 max-w-[1600px] mx-auto"
        >
           {children || <Outlet />}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;

export default AdminLayout;