'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, AlertTriangle, Shield, Users } from 'lucide-react'

interface CarouselSlide {
  id: number
  title: string
  description: string
  imageUrl: string
  ctaText: string
  ctaLink: string
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "Siaga Bencana 24/7",
    description: "Tim kami siap membantu masyarakat dalam situasi darurat bencana alam kapan saja.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Hubungi Kami",
    ctaLink: "#kontak"
  },
  {
    id: 2,
    title: "Peringatan Dini Cuaca",
    description: "Sistem peringatan dini cuaca ekstrem untuk antisipasi bencana alam.",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f92e38c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Cek Cuaca",
    ctaLink: "#cuaca"
  },
  {
    id: 3,
    title: "Edukasi Penanggulangan",
    description: "Program edukasi untuk masyarakat dalam menghadapi bencana alam.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Pelajari Lebih",
    ctaLink: "#layanan"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
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
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-disaster-orange/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Badan Penanggulangan Bencana Daerah</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {carouselSlides[currentSlide].title}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {carouselSlides[currentSlide].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={carouselSlides[currentSlide].ctaLink}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{carouselSlides[currentSlide].ctaText}</span>
              <Shield className="w-5 h-5" />
            </a>
            <a
              href="#tentang-kami"
              className="btn-secondary"
            >
              Pelajari Tentang Kami
            </a>
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
              index === currentSlide ? 'active' : ''
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Users className="w-4 h-4" />
          <span>Siap Melayani 24 Jam</span>
        </div>
      </div>
    </div>
  )
}