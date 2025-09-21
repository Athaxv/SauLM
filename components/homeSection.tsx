"use client"
import React, { useState, useEffect } from "react";
import LottieAnimation from "@/components/LottieAnimation";
import { PromptInputBox } from "./ai-prompt-box";
import { Header1 } from "./ui/header";

const HeroSection = () => {
  const [lottieData, setLottieData] = useState(null);

  // No mobile-specific logic needed currently

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden"
      style={{
        backgroundImage: `url('/Header-background.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      
    >
      {/* <Header1 /> */}
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pulse-200/30 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pulse-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-pulse-400/25 rounded-full blur-lg animate-pulse-slow" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-pulse-200 font-brockmann rounded-full text-sm font-medium text-pulse-600 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI Technology
          </div> */}

          {/* Headlines */}
          <div className="space-y-5">
            <h1 className="text-4xl font-brockmann md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-gray-900 leading-tight">
              Meet{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                SauLM
              </span>

              <br />
              Your Intelligent AI Lawyer
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Upload your legal documents and let SauLM uncover every detail, simplify complex clauses,
              and provide personalized legal insights instantly.
            </p>
          </div>

          {/* Central Input Card */}
          <div className="mx-auto w-full max-w-2xl">
            <PromptInputBox/>
          </div>

          {/* Trust Indicators */}
          {/* <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Enterprise-grade security
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Instant analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Privacy protected
            </div>
          </div> */}
        </div>
      </div>

      {/* Lottie Animation */}
      {lottieData && (
        <div className="absolute bottom-10 right-10 w-20 h-20 opacity-30">
          <LottieAnimation animationPath={lottieData} />
        </div>
      )}
    </section>
  );
};

export default HeroSection;