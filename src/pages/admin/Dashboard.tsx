import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useOrders } from '@/hooks/useOrders';
import { usePortfolios } from '@/hooks/usePortfolios';
import { useContactMessages } from '@/hooks/useContactMessages';
import { Users, FileText, Eye, TrendingUp, ArrowUpRight, Calendar, ShoppingCart, Briefcase, MessageSquare, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  // Calculate total revenue
  const totalRevenue = orders
    .filter(o => o.payment_status === 'paid')
    .reduce((sum, order) => sum + Number(order.amount), 0);

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/admin/orders',
      subtitle: `${pendingOrders} pending`,
    },
    {
      title: 'Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      link: '/admin/orders',
      subtitle: `${completedOrders} completed`,
    },
    {
      title: 'Portfolio',
      value: publishedPortfolios,
      icon: Briefcase,
      color: 'bg-purple-500',
      link: '/admin/portfolio',
      subtitle: `${portfolios.length} total`,
    },
    {
      title: 'Messages',
      value: messages.length,
      icon: MessageSquare,
      color: 'bg-orange-500',
      link: '/admin/messages',
      subtitle: `${unreadMessages} unread`,
    },
  ];

  const secondaryStats = [
    {
      title: 'Team Members',
      value: activeTeam,
      icon: Users,
      color: 'bg-cyan-500',
      link: '/admin/team',
    },
    {
      title: 'Blog Posts',
      value: publishedPosts,
      icon: FileText,
      color: 'bg-pink-500',
      link: '/admin/blog',
    },
  ];

  const recentOrders = orders.slice(0, 5);
  const recentMessages = messages.filter(m => !m.is_read).slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your admin dashboard. Manage your content from here.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                      )}
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-sm text-primary">
                    <span>View details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryStats.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-sm text-primary">
                    <span>Manage</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Link to="/admin/orders" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{order.customer_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{order.service_type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm font-medium">৳{Number(order.amount).toLocaleString()}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : order.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
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

          {/* Unread Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Unread Messages</CardTitle>
              <Link to="/admin/messages" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No unread messages</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                        {message.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{message.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {message.subject || message.message.substring(0, 50)}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link
                to="/admin/orders"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <ShoppingCart className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">New Order</span>
              </Link>
              <Link
                to="/admin/portfolio"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <Briefcase className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Add Portfolio</span>
              </Link>
              <Link
                to="/admin/blog/new"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">New Blog Post</span>
              </Link>
              <Link
                to="/admin/team"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <Users className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Add Team</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <Eye className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <Link
                to="/"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <TrendingUp className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">View Website</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
