import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useOrders } from '@/hooks/useOrders';
import { usePortfolios } from '@/hooks/usePortfolios';
import { useContactMessages } from '@/hooks/useContactMessages';
import { Users, FileText, TrendingUp, ArrowUpRight, ShoppingCart, Briefcase, MessageSquare, DollarSign, Activity } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { teamMembers } = useTeamMembers();
  const { posts } = useBlogPosts(false);
  const { orders } = useOrders();
  const { portfolios } = usePortfolios();
  const { messages } = useContactMessages();

  const publishedPosts = posts.filter(p => p.is_published).length;
  const activeTeam = teamMembers.filter(m => m.is_active).length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const unreadMessages = messages.filter(m => !m.is_read).length;
  const publishedPortfolios = portfolios.filter(p => p.is_published).length;
  
  const totalRevenue = orders
    .filter(o => o.payment_status === 'paid')
    .reduce((sum, order) => sum + Number(order.amount), 0);

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      gradient: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
      link: '/admin/orders',
      subtitle: `${pendingOrders} pending`,
    },
    {
      title: 'Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-emerald-500/20 to-emerald-600/20',
      iconColor: 'text-emerald-500',
      link: '/admin/orders',
      subtitle: `${completedOrders} completed`,
    },
    {
      title: 'Portfolio',
      value: publishedPortfolios,
      icon: Briefcase,
      gradient: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
      link: '/admin/portfolio',
      subtitle: `${portfolios.length} items`,
    },
    {
      title: 'Messages',
      value: messages.length,
      icon: MessageSquare,
      gradient: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-500',
      link: '/admin/messages',
      subtitle: `${unreadMessages} new`,
    },
  ];

  const recentOrders = orders.slice(0, 5);
  const recentMessages = messages.filter(m => !m.is_read).slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <div className="space-y-10 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Analyze your agency performance and content growth.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-2xl text-sm font-bold border border-primary/20">
            <Activity className="w-4 h-4 animate-pulse" />
            Live Updates
          </div>
        </div>

        {/* Main Stats Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={item}>
              <Link to={stat.link}>
                <Card className="glass-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border-none relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                        <p className="text-4xl font-extrabold mt-3 font-display tracking-tight">{stat.value}</p>
                        {stat.subtitle && (
                          <p className="text-xs font-medium text-muted-foreground mt-2 bg-secondary/50 inline-block px-2 py-1 rounded-lg italic">
                            {stat.subtitle}
                          </p>
                        )}
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-border/50`}>
                        <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-8 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                      <span>Analytics</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 glass-card border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <div>
                <CardTitle className="text-2xl font-display font-bold">Recent Orders</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Latest customer transactions</p>
              </div>
              <Link to="/admin/orders">
                <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/10 font-bold">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">No orders recorded yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-5 rounded-2xl hover:bg-secondary/50 transition-all duration-300 border border-transparent hover:border-border/50 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {order.customer_name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-lg truncate">{order.customer_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-muted-foreground">{order.service_type}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-sm font-bold text-primary">৳{Number(order.amount).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                          order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : order.status === 'in_progress'
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Column */}
          <div className="space-y-8">
            <Card className="glass-card border-none shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-display font-bold">Content Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-pink-500" />
                    <span className="font-bold">Blog Posts</span>
                  </div>
                  <span className="text-xl font-black">{publishedPosts}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-cyan-500" />
                    <span className="font-bold">Team Active</span>
                  </div>
                  <span className="text-xl font-black">{activeTeam}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <span className="font-bold">Portfolio</span>
                  </div>
                  <span className="text-xl font-black">{publishedPortfolios}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none shadow-xl bg-gradient-to-br from-primary to-accent text-primary-foreground p-1">
              <CardContent className="p-8 text-center bg-background/5 rounded-[calc(var(--radius)-4px)]">
                <h3 className="text-xl font-display font-bold mb-4">Launch New Feature</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/admin/blog/editor">
                    <Button variant="secondary" className="w-full rounded-xl font-bold py-6">
                      Blog
                    </Button>
                  </Link>
                  <Link to="/admin/portfolio">
                    <Button variant="secondary" className="w-full rounded-xl font-bold py-6">
                      Project
                    </Button>
                  </Link>
                </div>
                <Link to="/" className="inline-block mt-6 text-sm font-bold underline underline-offset-4 hover:opacity-80">
                  Preview Public Site
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
