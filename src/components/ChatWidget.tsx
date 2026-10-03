import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'live'>('ai');
  const [messages, setMessages] = useState<{sender: 'user' | 'bot' | 'admin', text: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Casting to any to bypass local type mismatch until schema syncs
        const { data } = await (supabase.from('chat_settings' as any).select('*') as any).single();
        if (data) setSettings(data);
      } catch (err) {
        console.error("Chat settings not found or error:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputValue('');

    if (activeTab === 'ai') {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Thank you for your message! I'm the InfraTech AI. How can I help you with our digital services?` 
        }]);
      }, 1000);
    } else {
      try {
        const { error } = await (supabase.from('chat_messages' as any).insert([{
          session_id: sessionId,
          sender_type: 'user',
          message: userMessage
        }] as any) as any);

        if (error) {
          toast.error("Failed to send message to live chat.");
        } else {
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              sender: 'admin', 
              text: "An agent will be with you shortly. For immediate assistance, feel free to call our support." 
            }]);
          }, 1500);
        }
      } catch (err) {
        toast.error("Live chat is currently unavailable.");
      }
    }
  };

  if (settings && !settings.ai_chat_enabled && !settings.live_chat_enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#0F172A] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">InfraTech Support</h3>
                  <p className="text-[10px] text-white/60">Online & Ready to Help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-3 text-xs font-bold transition-colors ${activeTab === 'ai' ? 'text-primary border-b-2 border-primary' : 'text-slate-400'}`}
              >
                AI Assistant
              </button>
              <button 
                onClick={() => setActiveTab('live')}
                className={`flex-1 py-3 text-xs font-bold transition-colors ${activeTab === 'live' ? 'text-primary border-b-2 border-primary' : 'text-slate-400'}`}
              >
                Live Support
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-sm italic">{settings?.welcome_message || "Hello! How can we help you today?"}</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
              />
              <Button onClick={handleSend} size="icon" className="rounded-xl shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:rotate-12" />}
      </button>
    </div>
  );
};
