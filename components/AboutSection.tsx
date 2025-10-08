import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-background py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          About SauLM
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          SauLM is an intelligent AI-powered platform designed to simplify
          learning and enhance collaboration through smart tools, analytics, and
          real-time interaction. Built for students, educators, and innovators.
        </p>
      </div>

      {/* Imported hover feature section */}
      <FeaturesSectionWithHoverEffects />

      <div className="mt-16 text-center">
        <a
          href="#get-started"
          className="inline-block rounded-2xl bg-primary text-white px-6 py-3 text-lg font-semibold hover:bg-primary/90 transition-all"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}