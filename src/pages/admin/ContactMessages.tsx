import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useContactMessages, ContactMessage } from '@/hooks/useContactMessages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, MailOpen, Trash2, Loader2, Search, Clock, Phone, Reply, CheckCheck } from 'lucide-react';

const ContactMessages = () => {
  const { messages, loading, refetch, unreadCount } = useContactMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !msg.is_read) ||
      (filter === 'read' && msg.is_read);
    return matchesSearch && matchesFilter;
  });

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      try {
        await supabase
          .from('contact_messages')
          .update({ is_read: true })
          .eq('id', message.id);
        refetch();
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_replied: true, replied_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      toast.success('Marked as replied');
      refetch();
      setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Message deleted');
      refetch();
      setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Messages</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'unread', 'read'] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className="capitalize"
                  >
                    {f}
                    {f === 'unread' && unreadCount > 0 && (
                      <span className="ml-1 bg-primary-foreground text-primary px-1.5 py-0.5 rounded-full text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {messages.length === 0 ? 'No messages yet' : 'No messages found'}
              </h3>
              <p className="text-muted-foreground">
                {messages.length === 0
                  ? 'Messages from your contact form will appear here'
                  : 'Try adjusting your search or filters'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${!message.is_read ? 'border-primary/50 bg-primary/5' : ''}`}
                onClick={() => openMessage(message)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!message.is_read ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    {message.is_read ? (
                      <MailOpen className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`truncate ${!message.is_read ? 'font-bold' : 'font-medium'}`}>
                        {message.name}
                      </h3>
                      <span className="text-sm text-muted-foreground">&lt;{message.email}&gt;</span>
                      {message.is_replied && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          Replied
                        </span>
                      )}
                    </div>
                    {message.subject && (
                      <p className={`text-sm mt-0.5 ${!message.is_read ? 'font-semibold' : ''}`}>
                        {message.subject}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {message.message}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Message from {selectedMessage.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">From</p>
                      <p className="font-medium">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                          <Phone className="w-4 h-4" />
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Received</p>
                      <p>{formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>

                  {selectedMessage.subject && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Subject</p>
                      <p className="font-semibold">{selectedMessage.subject}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                    <div className="p-4 rounded-lg bg-secondary/50 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <div className="flex gap-2">
                      <a href={`mailto:${selectedMessage.email}`}>
                        <Button variant="outline">
                          <Reply className="w-4 h-4 mr-2" />
                          Reply via Email
                        </Button>
                      </a>
                      {!selectedMessage.is_replied && (
                        <Button onClick={() => markAsReplied(selectedMessage.id)}>
                          <CheckCheck className="w-4 h-4 mr-2" />
                          Mark as Replied
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ContactMessages;