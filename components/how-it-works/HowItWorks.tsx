"use client"

import React, { useState, useRef } from "react"
import {
  Upload,
  Brain,
  MessageSquare,
  User,
  ChevronDown,
  Check,
  FileText,
  Zap,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, useInView } from "framer-motion"

type Props = {}

interface StepProps {
  icon: React.ReactNode
  title: string
  description: string
  stepNumber: number
  isLast?: boolean
}

interface ModelOption {
  id: string
  name: string
  description: string
  image: string
}

const StepCard: React.FC<StepProps> = ({ icon, title, description, stepNumber, isLast = false }) => {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Step Number Badge */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-white/80 backdrop-blur-md border-2 border-red-500 rounded-full flex items-center justify-center text-red-500 font-bold text-lg shadow-[0_4px_14px_rgba(239,68,68,0.4)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] transition-all duration-300" style={{ perspective: '1000px' }}>
          <div className="transform group-hover:rotateY-12 group-hover:rotateX-12 transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
            {icon}
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
          {stepNumber}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xs">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {/* Connecting Arrow */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-full transform translate-x-0">
          {/* Arrow line  */}
          <div className="relative">
            <div className="w-24 h-[3px] bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-full shadow-md"></div>
            {/* Arrow head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-pink-600"></div>

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default function HowItWorks(_props: Props) {
  const [selectedModel, setSelectedModel] = useState<ModelOption>({
    id: "saul-goodman",
    name: "Saul Goodman",
    description: "Criminal Defense Specialist",
    image: "/SaulGoodman.webp"
  })

  const modelOptions: ModelOption[] = [
    {
      id: "saul-goodman",
      name: "Saul Goodman",
      description: "Criminal Defense Specialist",
      image: "/SaulGoodman.webp"
    },
    {
      id: "harvey-specter",
      name: "Harvey Specter",
      description: "Corporate Law Expert",
      image: "/harveyspecter.webp"
    },
    {
      id: "matt-murdock",
      name: "Matt Murdock",
      description: "Civil Rights Advocate",
      image: "/mattmordock.webp"
    }
  ]

  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Legal Documents",
      description: "Upload your legal documents, contracts, or case files. SauLM supports PDF, DOCX, and other common formats."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "SauLM Analyzes via RAG + Embeddings",
      description: "Our AI processes your documents using advanced RAG technology and embeddings to understand context and extract key information."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Ask Questions",
      description: "Type your legal questions in natural language. Ask about clauses, obligations, risks, or any legal concerns you have."
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Get Persona-Tailored Answers",
      description: "Receive expert responses tailored to your selected AI lawyer persona, providing specialized legal insights and guidance."
    }
  ]

  // Scroll animation setup
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full bg-background py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            How <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">SauLM</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Transform your legal documents into actionable insights with our AI-powered legal assistant
          </p>

          {/* Model Selection */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <span className="text-sm font-medium text-muted-foreground">
              Choose your AI lawyer:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[200px] justify-between bg-background hover:bg-accent"
                >
                  <div className="flex items-center gap-3">

                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs" style={{ display: 'none' }}>
                      {selectedModel.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">{selectedModel.name}</div>
                      <div className="text-xs text-muted-foreground">{selectedModel.description}</div>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Select AI Lawyer
                </div>
                {modelOptions.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm" style={{ display: 'none' }}>
                      {model.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {model.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {model.description}
                      </div>
                    </div>
                    {selectedModel.id === model.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Steps Flow */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 lg:items-start">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <StepCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  stepNumber={index + 1}
                  isLast={index === steps.length - 1}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <StepCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  stepNumber={index + 1}
                  isLast={index === steps.length - 1}
                />
                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="w-2 h-16 bg-gradient-to-b from-red-500 via-pink-500 to-red-500 rounded-full shadow-lg"></div>
                      {/* Arrow head */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rotate-45 transform shadow-md"></div>
                      </div>

                      {/* Animated pulse effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-red-500 to-pink-600 rounded-full opacity-0"
                        animate={{
                          opacity: [0, 0.3, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/70 hover:backdrop-blur-xl hover:border hover:border-red-200/60 group/card">
            <div className="transform transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotateY-12" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Document Analysis
            </h3>
            <p className="text-muted-foreground text-sm">
              Advanced RAG technology processes your legal documents for comprehensive understanding
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/70 hover:backdrop-blur-xl hover:border hover:border-red-200/60 group/card">
            <div className="transform transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotateY-12" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Instant Responses
            </h3>
            <p className="text-muted-foreground text-sm">
              Get immediate, expert-level answers to your legal questions with persona-based insights
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/70 hover:backdrop-blur-xl hover:border hover:border-red-200/60 group/card">
            <div className="transform transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotateY-12" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Specialized Expertise
            </h3>
            <p className="text-muted-foreground text-sm">
              Choose from different AI lawyer personas for specialized legal guidance
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 text-center"
        >
          <a
            href="#get-started"
            className="inline-block rounded-2xl bg-primary text-white px-6 py-3 text-lg font-semibold hover:bg-primary/90 transition-all"
          >
            Get Started
          </a>
        </motion.div>

        {/* Minimal Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Soft gradient layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-pink-100/30 to-red-200/40"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Gentle moving blurred orbs */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-48 h-48 bg-red-300/50 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-pink-400/50 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-red-300/30 to-pink-400/30 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

      </div>
    </motion.section>
  )
}
