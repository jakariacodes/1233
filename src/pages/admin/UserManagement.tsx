import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "@/hooks/useUsers";
import { Search, UserCircle, Mail, Phone, MapPin, Calendar, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const UserManagement = () => {
  const { users, loading, error, refetch } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-2">Manage your registered customers and their profiles.</p>
          </div>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            className="rounded-xl border-primary/20 text-primary hover:bg-primary/10 gap-2 h-12"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh Data
          </Button>
        </div>

        <Card className="glass-card border-none shadow-xl overflow-hidden">
          <CardHeader className="pb-2">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-none focus:ring-primary/20"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="font-medium">Loading user profiles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive font-bold mb-2">Error loading users</p>
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={() => refetch()} variant="outline" className="mt-4 rounded-xl">Try Again</Button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <UserCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="font-bold text-lg">No users found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">User</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Contact</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Location</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Joined</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-secondary/30 transition-colors border-border/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {(user.first_name?.charAt(0) || user.id.charAt(0)).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className="text-[10px] text-muted-foreground font-mono">{user.id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {user.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <Phone className="w-3 h-3" />
                                {user.phone}
                              </div>
                            )}
                            {/* Note: In profiles table we don't store email, it's in auth.users */}
                            {/* But admins can find it in orders if they needed to */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 max-w-[200px]">
                            <div className="flex items-start gap-2 text-xs text-muted-foreground font-medium">
                              <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                              <span className="line-clamp-2">{user.address || "No address"}</span>
                            </div>
                            {user.country && (
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 ml-5">
                                {user.country}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Calendar className="w-3 h-3" />
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`rounded-lg font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                              user.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {user.status || 'Registered'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;