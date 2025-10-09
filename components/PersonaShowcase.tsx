"use client"
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Persona {
  name: string;
  tagline: string;
  description: string;
  image: string;
  gradient: string;
  textColor: string;
  specialty: string;
}

interface PersonaCardProps {
  persona: Persona;
  index: number;
}

const PersonaCard = ({ persona, index }: PersonaCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
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
        "group relative overflow-hidden rounded-2xl bg-white border border-gray-200 opacity-0 transition-all duration-700",
        "hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 hover:border-gray-300",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-500",
        `before:${persona.gradient} hover:before:opacity-10`
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative mb-6 mx-auto">
          <div className={cn(
            "relative w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-500",
            "group-hover:scale-110 group-hover:border-opacity-50",
            `border-gray-200 group-hover:${persona.textColor}`
          )}>
            <Image
              src={persona.image}
              alt={persona.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500",
            `bg-gradient-to-br ${persona.gradient} group-hover:opacity-30`
          )} />
        </div>

        {/* Content Section */}
        <div className="text-center flex-1 flex flex-col justify-between">
          <div>
            <h3 className={cn(
              "text-xl font-bold mb-2 transition-colors duration-300",
              `text-gray-900 group-hover:${persona.textColor}`
            )}>
              {persona.name}
            </h3>
            
            <p className="text-sm font-medium text-gray-600 mb-3 italic">
              "{persona.tagline}"
            </p>
            
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {persona.description}
            </p>
          </div>

          {/* Specialty Badge */}
          <div className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
            "bg-gray-100 text-gray-700 group-hover:bg-opacity-20",
            `group-hover:${persona.textColor} group-hover:bg-current`
          )}>
            {persona.specialty}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className={cn(
          "absolute top-0 right-0 w-20 h-20 opacity-0 transition-opacity duration-500",
          `bg-gradient-to-br ${persona.gradient} group-hover:opacity-20`,
          "rounded-bl-full"
        )} />
      </div>
    </div>
  );
};

const PersonaShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const personas: Persona[] = [
    {
      name: "Harvey Specter",
      tagline: "Sharp. Tactical. Ruthless logic.",
      description: "Master of corporate law with an unmatched strategic mind. When you need to win at all costs, Harvey delivers precision and power.",
      image: "/harveyspecter.webp",
      gradient: "from-gray-600 to-black",
      textColor: "text-gray-800",
      specialty: "Corporate Law"
    },
    {
      name: "Saul Goodman",
      tagline: "Creative legal hacks with street-smart persuasion.",
      description: "Think outside the box with unconventional solutions. Saul finds loopholes and creative approaches others miss.",
      image: "/SaulGoodman.webp",
      gradient: "from-yellow-400 to-orange-500",
      textColor: "text-orange-600",
      specialty: "Criminal Defense"
    },
    {
      name: "Matt Murdock",
      tagline: "Justice with integrity and moral clarity.",
      description: "Principled defender of the innocent with unwavering ethics. When justice matters more than winning, Matt is your advocate.",
      image: "/mattmordock.webp",
      gradient: "from-red-500 to-red-700",
      textColor: "text-red-600",
      specialty: "Civil Rights"
    },
    {
      name: "Tyrion Lannister",
      tagline: "Master of words, defender of reason — because justice needs wit, not war.",
      description: "Brilliant strategist who uses intelligence and diplomacy to navigate complex legal landscapes with eloquence and wisdom.",
      image: "/placeholder.svg",
      gradient: "from-purple-500 to-indigo-600",
      textColor: "text-purple-600",
      specialty: "Diplomatic Law"
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
                el.classList.add("animate-fade-in-up");
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
    <section 
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
      id="personas"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tr from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/3 to-cyan-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-transparent bg-clip-text text-sm font-medium mb-4 fade-in-element opacity-0">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs mr-2">
              ⚖️
            </span>
            <span className="text-gray-700">Meet Your AI Legal Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 fade-in-element opacity-0">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Legal Persona
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed fade-in-element opacity-0">
            Each persona brings a unique approach to legal reasoning. Pick the style that matches your needs — 
            from aggressive corporate tactics to principled advocacy.
          </p>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {personas.map((persona, index) => (
            <PersonaCard
              key={persona.name}
              persona={persona}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-element opacity-0">
          <p className="text-gray-600 mb-6">
            Experience personalized legal assistance tailored to your preferred approach
          </p>
          <div className="inline-flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>AI-Powered</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Context-Aware</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Personality-Driven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaShowcase;