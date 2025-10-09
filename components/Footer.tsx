



import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react"; // icons

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        {/* Left - Logo and info */}
        <div className="flex flex-col gap-3 max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SauLM
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI-powered reasoning platform for persona-based responses and secure document handling.
          </p>
        </div>

        {/* Middle - Links */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Product
            </h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Use Cases</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Company
            </h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">About</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Right - Socials */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Follow us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" aria-label="Mail">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 SauLM. All rights reserved.
      </div>
    </footer>
  );
}