"use client"
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Upload, 
  Shield, 
  Zap, 
  Globe,
  User,
  FileCheck,
  Lock,
  Clock,
  Languages
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  highlight?: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const FeatureCard = ({ icon, title, description, index, highlight = false }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 opacity-0 transition-all duration-500",
        "hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/0 before:to-purple-50/0",
        "hover:before:from-blue-50/30 hover:before:to-purple-50/30 before:transition-all before:duration-500",
        highlight && "ring-2 ring-blue-200 bg-gradient-to-br from-blue-50/30 to-purple-50/20"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="relative z-10">
        <div className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300",
          "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600",
          "group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:scale-110"
        )}>
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-0" />
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const features: Feature[] = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Persona-Based Reasoning",
      description: "Advanced AI that adapts its legal reasoning style to match different legal personas and contexts, providing more nuanced and relevant advice.",
      highlight: true
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Document Upload & Retrieval",
      description: "Seamlessly upload, analyze, and retrieve legal documents with intelligent parsing and contextual understanding of complex legal texts.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Data Handling",
      description: "Enterprise-grade security with end-to-end encryption, ensuring your sensitive legal documents and conversations remain confidential and protected.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Responses",
      description: "Get instant legal analysis and recommendations powered by optimized AI models, eliminating wait times for critical legal insights.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Future-ready internationalization with support for multiple languages, making legal AI accessible to global users and diverse legal systems.",
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden" id="features" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 opacity-0 fade-in-element">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs mr-2">
              ✨
            </span>
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 opacity-0 fade-in-element">
            Intelligent Legal AI,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Human-Like Understanding
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0 fade-in-element">
            Built with cutting-edge generative AI to make legal assistance accessible, fast, and trustworthy for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              highlight={feature.highlight}
            />
          ))}
        </div>
        
        {/* Additional visual elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 opacity-0 fade-in-element">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Always learning</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>SOC 2 Compliant</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>24/7 Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
