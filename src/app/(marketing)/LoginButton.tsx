"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function LoginButton() {
  const handleLogin = () => {
    // Clear localStorage data before signin
    if (typeof window !== 'undefined') {
      localStorage.removeItem("theme");
      localStorage.removeItem("onboarding_completed");
      localStorage.removeItem("privacy_mode");
      localStorage.removeItem("important_emails_description");
      sessionStorage.setItem("force_theme_selection", "true");
    }
    
    signIn("google", { callbackUrl: '/onboarding/privacy-mode' });
  };

  return (
    <Button 
      onClick={handleLogin} 
      variant="default" 
      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium"
      size="sm"
    >
      <LogIn className="h-4 w-4" />
      <span>Login</span>
    </Button>
  );
} 