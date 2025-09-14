"use client"
import React, { useState } from "react";
import { ArrowRight, Upload, FileText, CheckCircle } from "lucide-react";

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50" id="upload">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
            <span>Upload</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">Smart Document Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Automatically review contracts and agreements</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Upload any legal document and let SauLM's advanced AI analyze every clause, identify potential issues, 
              and provide clear explanations in plain language. From contracts to agreements, get insights in seconds.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant clause analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Risk assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Plain language explanations</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div 
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging 
                  ? 'border-pulse-500 bg-pulse-50' 
                  : uploadedFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-pulse-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="text-green-600">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-semibold">{uploadedFile}</p>
                  <p className="text-sm text-gray-500 mt-2">Ready for analysis</p>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-800 mb-2">Drop your document here</p>
                  <p className="text-gray-500 mb-6">PDF, DOC, DOCX up to 10MB</p>
                  <button className="bg-pulse-500 text-white px-6 py-3 rounded-full hover:bg-pulse-600 transition-colors">
                    Choose File
                  </button>
                </>
              )}
            </div>
            
            {uploadedFile && (
              <button className="w-full mt-6 bg-pulse-500 text-white px-6 py-3 rounded-full hover:bg-pulse-600 transition-colors flex items-center justify-center gap-2">
                Analyze Document
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;