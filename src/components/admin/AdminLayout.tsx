import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Menu, X, Bell, Search, ChevronRight, Globe, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
    { icon: Briefcase, label: "Portfolio", href: "/admin/portfolio" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-secondary/10 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">T</div>
            <span className="font-display font-bold text-xl">TechCrafter Admin</span>
          </Link>

          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href as any}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group"
                activeProps={{ className: "bg-primary/10 text-primary" }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-border space-y-2">
             <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
             </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border h-16 sticky top-0 z-40 px-8 flex items-center justify-between">
           <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
           </button>
           <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm font-medium">{user?.email}</span>
           </div>
        </header>
        <div className="p-8">
           {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;