"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: "t1",
      name: "Marcus Vance",
      role: "CTO at HyperScale",
      comment: "Nexus Hub transformed how we order hardware and schedule architecture reviews. The hybrid checkout saved us countless admin hours!",
      rating: 5,
    },
    {
      id: "t2",
      name: "Elena Rostova",
      role: "Lead Product Designer",
      comment: "The real-time booking calendar widget is unbelievably smooth. Seamless integration between products and live advisory sessions.",
      rating: 5,
    },
    {
      id: "t3",
      name: "David Kim",
      role: "Founder, Apex Labs",
      comment: "Best-in-class user experience! Sleek dark mode design, lightning-fast pages, and instant calendar reservations.",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 border border-gray-800 rounded-3xl p-8 max-w-4xl mx-auto text-white shadow-2xl relative">
      <Quote className="w-12 h-12 text-indigo-500/20 absolute top-6 left-6" />

      <div className="space-y-6 text-center max-w-2xl mx-auto relative z-10">
        <div className="flex justify-center text-amber-400">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400" />
          ))}
        </div>

        <p className="text-base sm:text-xl font-medium text-gray-200 italic leading-relaxed">
          &ldquo;{t.comment}&rdquo;
        </p>

        <div>
          <h4 className="text-base font-extrabold text-white">{t.name}</h4>
          <span className="text-xs text-indigo-400 font-semibold">{t.role}</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === idx ? "bg-indigo-500 w-6" : "bg-gray-800"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
