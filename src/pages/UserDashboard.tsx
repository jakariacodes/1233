import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const { orders, loading } = useOrders();
  const navigate = useNavigate();

  // Filter orders for the current user
  const userOrders = orders.filter(o => o.customer_email === user?.email);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="container-custom max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-32">
              <div className="flex items-center gap-4 mb-8 px-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {user?.user_metadata?.['full_name']?.[0] || user?.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 truncate max-w-[150px]">
                    {user?.user_metadata?.['full_name'] || 'Customer'}
                  </h3>
                  <p className="text-xs text-slate-500 truncate max-w-[150px]">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary font-semibold transition-all">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all cursor-not-allowed opacity-50">
                  <Package className="w-5 h-5" />
                  My Services
                </button>
                <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all cursor-not-allowed opacity-50">
                  <MessageSquare className="w-5 h-5" />
                  Support
                </button>
                <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all cursor-not-allowed opacity-50">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Welcome Back!</h1>
                <p className="text-slate-500 mt-1">Monitor your active projects and service orders.</p>
              </div>
              <Button className="rounded-2xl px-6 h-12 font-bold shadow-lg shadow-primary/20" asChild>
                <Link to="/services">Order New Service</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Services', value: userOrders.filter(o => o.status === 'in_progress').length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Pending Orders', value: userOrders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Completed', value: userOrders.filter(o => o.status === 'completed').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              ].map((stat, i) => (
                <Card key={i} className="rounded-[1.5rem] border-slate-100 shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
              <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between border-b border-slate-50 pb-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Orders
                </CardTitle>
                <Link to="/dashboard" className="text-sm font-semibold text-primary hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-12 text-center text-slate-400">Loading your orders...</div>
                ) : userOrders.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 mb-6">You haven't placed any orders yet.</p>
                    <Button variant="outline" className="rounded-xl" asChild>
                      <Link to="/services">Browse Services</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-500">
                          <th className="px-8 py-4 font-bold">Order Details</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                          <th className="px-6 py-4 font-bold">Amount</th>
                          <th className="px-8 py-4 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {userOrders.map((order) => (
                          <motion.tr 
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-50/30 transition-colors group"
                          >
                            <td className="px-8 py-5">
                              <div>
                                <h5 className="font-bold text-slate-900">{order.service_type}</h5>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-slate-500">#{order.order_number}</span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-bold uppercase tracking-tighter">
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col gap-1">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(order.status)} uppercase w-fit`}>
                                  {order.status.replace('_', ' ')}
                                </span>
                                {order.payment_status === 'unpaid' && (
                                  <span className="text-[9px] text-orange-500 font-bold flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                                    Awaiting Payment Approval
                                  </span>
                                )}
                                {order.payment_status === 'paid' && (
                                  <span className="text-[9px] text-green-600 font-bold flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Payment Verified
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">৳{order.amount.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{order.package_name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-200">
                                Track Details
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[1.5rem] border-slate-100 shadow-sm bg-gradient-to-br from-primary to-primary/80 text-white border-none">
                <CardContent className="p-8">
                  <ShieldCheck className="w-10 h-10 mb-4 opacity-80" />
                  <h4 className="text-xl font-bold mb-2">Need Assistance?</h4>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Our dedicated project managers are available to help you with your order status or technical questions.
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-xl font-bold w-full md:w-auto px-6 h-11" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-[1.5rem] border-slate-100 shadow-sm bg-white border-dashed border-2">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-slate-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Billing Details</h4>
                  <p className="text-slate-500 text-sm mb-6">
                    Manage your invoices, payment methods, and transaction history.
                  </p>
                  <Button variant="outline" className="rounded-xl font-bold w-full md:w-auto px-6 h-11 opacity-50 cursor-not-allowed">
                    View Invoices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}