"use client"
import React from "react";
import { motion } from "framer-motion";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import { ArrowRight, Scale, Shield, Zap, Users, Brain, FileText } from "lucide-react";
import { Button } from "./ui/button";

export default function AboutSection() {
 

  return (
    <section
      id="about"
      className="relative w-full py-24 px-4 md:px-8 lg:px-16 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 font-medium rounded-full text-sm text-gray-700 shadow-sm mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Brain className="w-4 h-4" />
            Powered by Advanced AI Technology
          </motion.div>

          <h2 className="text-4xl font-brockmann md:text-5xl lg:text-5xl font-display font-bold tracking-tighter text-gray-900 leading-tight mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              SauLM
            </span>
          </h2>
          
          <motion.p 
            className="text-md md:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            SauLM is an intelligent AI-powered legal platform designed to demystify complex legal documents. 
            Built for lawyers, businesses, and individuals who need instant, accurate legal insights without the jargon.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        

        {/* Stats Section */}
        

        {/* Imported hover feature section */}
        <FeaturesSectionWithHoverEffects />

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="md"
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started with SauLM
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}