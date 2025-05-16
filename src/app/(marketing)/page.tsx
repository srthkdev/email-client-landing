"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Shield, Zap, Brain, Lock, Github } from "lucide-react";
import Navbar from "./Navbar";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const onboardingCompleted = localStorage.getItem("onboarding_completed");
      if (onboardingCompleted === "true") {
        router.push("/inbox");
      } else {
        router.push("/onboarding/privacy-mode");
      }
    }
    
    // Force dark mode for the landing page
    document.documentElement.classList.add('dark');
  }, [status, router]);

  const handleConnect = () => {
    // More thorough cleanup of theme and onboarding data
    if (typeof window !== 'undefined') {
      // Clear next-themes storage
      localStorage.removeItem("theme");
      // Some implementations use these variations
      localStorage.removeItem("next-theme");
      localStorage.removeItem("theme-preference");
      
      // Clear onboarding data
      localStorage.removeItem("onboarding_completed");
      localStorage.removeItem("privacy_mode");
      localStorage.removeItem("important_emails_description");

      // Add a flag to indicate theme should be reset during onboarding
      sessionStorage.setItem("force_theme_selection", "true");
    }
    
    signIn("google", { callbackUrl: '/onboarding/privacy-mode' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Your AI-Powered Email Assistant with{" "}
              <span className="text-blue-500">Full Privacy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Experience intelligent email management powered by your choice of AI models.
              Run everything locally for complete privacy, or connect to your preferred LLM provider.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleConnect}
              >
                Connect with Gmail <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
              AI-powered email management, your way
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-900">
                  <Brain className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">Local AI Processing</h3>
                <p className="mt-2 text-gray-300">
                  Use your preferred LLM locally. Support for Llama, Mistral, and more. Your data stays on your machine.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-900">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">Smart Email Management</h3>
                <p className="mt-2 text-gray-300">
                  AI-powered categorization, summarization, and priority inbox features that respect your privacy.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-900">
                  <Lock className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">Privacy First</h3>
                <p className="mt-2 text-gray-300">
                  Open-source, self-hostable, and designed for privacy. Your emails never leave your control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="border-t border-gray-800 px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your Privacy, Your Control
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Unlike cloud-based solutions, Venn processes everything locally on your machine.
              Configure your own LLM models, self-host the entire application, and keep your
              data completely under your control.
            </p>
            <div className="mt-10">
              <a 
                href="https://github.com/yourusername/venn" 
                target="_blank"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-6 px-4 lg:px-8">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © 2024 Venn. Open source and privacy-focused.
          </p>
          <nav className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
            <a 
              href="https://github.com/yourusername/venn" 
              target="_blank"
              className="text-sm text-gray-400 hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
} 