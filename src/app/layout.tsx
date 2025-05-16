import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import AuthProvider from "@/components/auth-provider";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster"
import { AiChatProvider } from "@/context/ai-chat-context";
import { AiChat } from "@/components/ai-chat";

export const metadata: Metadata = {
  title: "Venn - Modern Email Client",
  description: "A modern email client with a clean interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning
      >
        <Providers>
          <AuthProvider>
            <AiChatProvider>
              <div className="relative flex min-h-screen flex-col bg-background">
                {children}
              </div>
              <AiChat />
            </AiChatProvider>
          </AuthProvider>
        </Providers>
        <Toaster />
        {/* Portal container for highest z-index content */}
        <div id="ai-chat-portal" className="portal-container"></div>
      </body>
    </html>
  );
}
