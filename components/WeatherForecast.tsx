// components/WeatherForecast

"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Cuaca } from "@prisma/client";

import { Thermometer } from "lucide-react";

export default function WeatherForecast() {
  const [weatherData, setWeatherData] = useState<Cuaca>();

  console.log("existingDataId", weatherData);

  useEffect(() => {
    const loadCuacaData = async () => {
      try {
        const response = await fetch("/api/cuaca");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setWeatherData(data);
          }
        }
      } catch (error) {
        console.error("Error loading cuaca data:", error);
      }
    };

    loadCuacaData();
  }, []);

  return (
    <section id="cuaca" className="py-20 weather-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-disaster-orange/10 px-4 py-2 rounded-full mb-4">
            <Thermometer className="w-5 h-5 text-disaster-orange" />
            <span className="text-sm font-medium text-disaster-orange">
              Peringatan Dini Cuaca
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {weatherData?.namaPrakiraan}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Pantau kondisi cuaca terkini untuk antisipasi bencana alam dan
            keselamatan masyarakat
          </p>
        </div>

        {weatherData?.fotoUrl && (
          <div className="relative w-full lg:max-w-7xl h-[800px]">
            <Image
              src={weatherData.fotoUrl}
              alt={weatherData.namaPrakiraan}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
