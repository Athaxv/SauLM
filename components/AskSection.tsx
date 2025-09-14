"use client"
import React, { useState } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

const AskSection = () => {
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsAsking(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsAsking(false);
      setQuestion("");
    }, 2000);
  };

  const sampleQuestions = [
    "What are the key terms in this employment contract?",
    "Is this clause enforceable in my state?",
    "What are my rights if the other party breaches?",
    "How can I negotiate better terms?"
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="ask">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Ask</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">Interactive Q&A</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-pulse-50 to-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-pulse-500" />
              <h3 className="text-xl font-semibold">Ask SauLM Anything</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your legal question here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent outline-none resize-none h-32"
                />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-pulse-400" />
              </div>
              
              <button 
                type="submit"
                disabled={!question.trim() || isAsking}
                className="w-full bg-pulse-500 text-white px-6 py-3 rounded-full hover:bg-pulse-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAsking ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get Answer
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Try asking:</p>
              <div className="space-y-2">
                {sampleQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(q)}
                    className="text-left text-sm text-pulse-600 hover:text-pulse-700 block hover:underline"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get answers tailored to your legal situation</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              SauLM provides personalized legal insights based on your specific circumstances. 
              Ask about contract terms, legal procedures, compliance requirements, or any legal matter.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-pulse-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Clear Clause Explanations</h4>
                  <p className="text-gray-600 text-sm">Complex legal jargon simplified into easy-to-understand language.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-pulse-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Scenario-based Advice</h4>
                  <p className="text-gray-600 text-sm">Personalized recommendations based on your specific case and jurisdiction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskSection;