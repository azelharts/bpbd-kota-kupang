// components/HeroCarousel.tsx

"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "Sincan Kotaku",
    description: "Sistem Informasi Kebencanaan Kota Kupang",
    imageUrl: "/slider1.png",
    ctaText: "Prakiraan Cuaca",
    ctaLink: "#cuaca",
  },
  {
    id: 2,
    title: "Sincan Kotaku",
    description: "Sistem Informasi Kebencanaan Kota Kupang",
    imageUrl: "/slider2.png",
    ctaText: "Prakiraan Cuaca",
    ctaLink: "#cuaca",
  },
  {
    id: 3,
    title: "Sincan Kotaku",
    description: "Sistem Informasi Kebencanaan Kota Kupang",
    imageUrl: "/slider3.png",
    ctaText: "Prakiraan Cuaca",
    ctaLink: "#cuaca",
  },
  {
    id: 4,
    title: "Sincan Kotaku",
    description: "Sistem Informasi Kebencanaan Kota Kupang",
    imageUrl: "/slider4.png",
    ctaText: "Prakiraan Cuaca",
    ctaLink: "#cuaca",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 border-2 border-disaster-orange/90 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                Badan Penanggulangan Bencana Daerah
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-8xl font-bold mb-2 leading-tight">
            {carouselSlides[currentSlide].title}
          </h1>

          <p className="md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            --{carouselSlides[currentSlide].description}--
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={carouselSlides[currentSlide].ctaLink}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{carouselSlides[currentSlide].ctaText}</span>
            </Link>
            <Link href="#tentang-kami" className="btn-primary">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${
              index === currentSlide ? "active" : ""
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
