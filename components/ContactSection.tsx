"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out. Our team will respond shortly.");
    setForm({ name: "", email: "", phone: "", subject: "General", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50"
    >
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <h2 className="text-4xl font-brockmann md:text-5xl lg:text-5xl font-display font-bold tracking-tighter text-gray-900 mb-4">
          Connect{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            with SauLM
          </span>
        </h2>
        <p className="text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
          Questions, suggestions, or partnership inquiries? Our team is ready to assist — just complete the form below.
        </p>
        <p className="text-sm text-gray-400 mb-12">
          We usually respond within 24 hours.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            >
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message or Inquiry"
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6"
            required
          ></textarea>

          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
