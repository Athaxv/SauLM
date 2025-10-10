"use client"
import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "SauLM simplified our contract review process. What used to take hours now takes minutes, and I feel confident understanding every clause.",
  author: "Emily Rodriguez",
  role: "Small Business Owner",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png"
}, {
  content: "The accuracy and speed of SauLM's legal analysis exceeded our expectations. It's like having a legal expert available 24/7.",
  author: "David Chen",
  role: "Startup Founder",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/background-section2.png"
}, {
  content: "SauLM helped me understand my lease agreement and negotiate better terms. The plain language explanations were invaluable.",
  author: "Sarah Johnson",
  role: "Real Estate Investor",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/background-section3.png"
}, {
  content: "Finally, legal assistance that's both accessible and reliable. SauLM gives me the confidence to handle legal documents myself.",
  author: "Michael Park",
  role: "Freelance Consultant",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/background-section1.png"
}];

const TestimonialCard = ({ content, author, role, backgroundImage: _backgroundImage }: TestimonialProps) => {
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=fff&color=333&rounded=true&size=64`;
  return (
    <div className="bg-white rounded-xl p-6 shadow h-full flex flex-col justify-between overflow-hidden">
      <blockquote className="text-gray-700 text-base leading-relaxed mb-6 whitespace-normal break-words">“{content}”</blockquote>
      <div className="flex items-center gap-3 mt-4">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials so the marquee effect is seamless
  const duplicated = [...testimonials, ...testimonials];

  const Lane = ({ children, duration = "30s", reverse = false }: { children: React.ReactNode; duration?: string; reverse?: boolean }) => {
    const dir = reverse ? "reverse" : "normal";
    return (
      <div className="overflow-hidden py-4">
        <div
          className="flex gap-6 items-stretch will-change-transform"
          style={{ animation: `marquee ${duration} linear infinite ${dir}` }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-white rounded-full px-3 py-1 text-sm text-pulse-600 mb-4 font-brockmann">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-brockmann font-bold mb-3">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">What our users say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See what our customers have to say about us.</p>
        </div>

        {/* Inject keyframes and reduced-motion support inline so styles ship with the component */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .will-change-transform { animation: none !important; }
          }
        `}</style>

        {/* Three lanes with different speeds and directions */}
        <div className="space-y-4">
          <Lane duration="36s" reverse={false}>
            {duplicated.map((t, i) => (
              <div key={`l1-${i}`} className="w-80 flex-shrink-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </Lane>

          <Lane duration="48s" reverse={true}>
            {duplicated.map((t, i) => (
              <div key={`l2-${i}`} className="w-80 flex-shrink-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </Lane>

          <Lane duration="42s" reverse={false}>
            {duplicated.map((t, i) => (
              <div key={`l3-${i}`} className="w-80 flex-shrink-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </Lane>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
