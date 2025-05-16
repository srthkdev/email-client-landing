"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiChat } from "@/context/ai-chat-context";
import { createPortal } from "react-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export function AiChat() {
  const { isOpen, closeChat, openChat } = useAiChat();
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  
  // Mount check for SSR and setup portal container
  useEffect(() => {
    setMounted(true);
    // Try to find our custom portal container first
    let container = document.getElementById('ai-chat-portal');
    
    // If it doesn't exist, fall back to body
    if (!container) {
      container = document.body;
    }
    
    setPortalContainer(container);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a simulated AI response. In a real implementation, this would call an API to get a response from an AI model.",
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // If not mounted yet (during SSR) or no portal container, render nothing
  if (!mounted || !portalContainer) return null;
  
  // Create content to be rendered in portal
  const content = (
    <>
      {/* Toggle button - fixed in the bottom right corner */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-[999999]"
          aria-label="Open AI Chat"
          style={{ position: 'fixed', zIndex: 999999 }}
        >
          <Sparkles className="h-5 w-5" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div 
          className={cn(
            "fixed z-[999999] transition-all duration-300 ease-in-out", 
            isMinimized 
              ? "bottom-4 right-4 w-64 h-12" 
              : "bottom-4 right-4 w-96 h-[500px] max-h-[80vh]"
          )}
          style={{ position: 'fixed', zIndex: 999999 }}
        >
          <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost" 
                  size="icon" 
                  onClick={handleMinimize}
                  className="h-6 w-6 text-white hover:bg-blue-500 rounded-sm"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost" 
                  size="icon" 
                  onClick={closeChat}
                  className="h-6 w-6 text-white hover:bg-blue-500 rounded-sm"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Message area - only shown when not minimized */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-gray-500 dark:text-gray-400">
                    <Sparkles className="h-8 w-8 mb-2 text-blue-500" />
                    <h3 className="font-medium">How can I help you?</h3>
                    <p className="text-sm mt-1">Ask me anything about your emails, calendar, or tasks.</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2 max-w-[90%]",
                        message.role === "user" ? "ml-auto" : "mr-auto"
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/ai-avatar.png" />
                          <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg p-3 text-sm",
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        )}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs mt-1 opacity-70 text-right">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-2 max-w-[90%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input area - only shown when not minimized */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
  
  // Use a portal to render to our specific portal container
  return createPortal(content, portalContainer);
} 