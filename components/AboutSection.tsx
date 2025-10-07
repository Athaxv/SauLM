import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About SauLM</h2>
        <p className="text-lg text-gray-700 mb-8">
          SauLM is a persona-based AI legal assistant that helps analyze documents and provide law-focused guidance.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">Provide fast, accurate, and persona-based legal guidance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">Empower everyone to access legal assistance through AI technology.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
