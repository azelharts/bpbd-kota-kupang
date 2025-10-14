"use client";

import React from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
} from "lucide-react";

interface WeatherData {
  day: string;
  date: string;
  icon: React.ReactNode;
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
}

const weatherData: WeatherData[] = [
  {
    day: "Senin",
    date: "14 Okt",
    icon: <Cloud className="w-8 h-8 text-gray-600" />,
    temp: "28°C",
    condition: "Berawan",
    humidity: "75%",
    wind: "15 km/jam",
  },
  {
    day: "Selasa",
    date: "15 Okt",
    icon: <CloudRain className="w-8 h-8 text-blue-600" />,
    temp: "24°C",
    condition: "Hujan Ringan",
    humidity: "85%",
    wind: "20 km/jam",
  },
  {
    day: "Rabu",
    date: "16 Okt",
    icon: <Sun className="w-8 h-8 text-yellow-500" />,
    temp: "32°C",
    condition: "Cerah",
    humidity: "60%",
    wind: "10 km/jam",
  },
  {
    day: "Kamis",
    date: "17 Okt",
    icon: <Cloud className="w-8 h-8 text-gray-600" />,
    temp: "29°C",
    condition: "Berawan",
    humidity: "70%",
    wind: "12 km/jam",
  },
  {
    day: "Jumat",
    date: "18 Okt",
    icon: <CloudRain className="w-8 h-8 text-blue-600" />,
    temp: "25°C",
    condition: "Hujan Sedang",
    humidity: "90%",
    wind: "25 km/jam",
  },
];

export default function WeatherForecast() {
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
            Informasi Prakiraan Cuaca
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pantau kondisi cuaca terkini untuk antisipasi bencana alam dan
            keselamatan masyarakat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Prakiraan 5 Hari
                  </h3>
                  <p className="text-sm text-gray-600">
                    Kota Provinsi, Indonesia
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-disaster-orange">
                    28°C
                  </p>
                  <p className="text-sm text-gray-600">Sekarang</p>
                </div>
              </div>

              <div className="space-y-4">
                {weatherData.map((weather, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          {weather.day}
                        </p>
                        <p className="text-xs text-gray-600">{weather.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {weather.icon}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {weather.temp}
                          </p>
                          <p className="text-sm text-gray-600">
                            {weather.condition}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Droplets className="w-4 h-4" />
                        <span>{weather.humidity}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Wind className="w-4 h-4" />
                        <span>{weather.wind}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-disaster-orange/10 rounded-2xl p-6 border border-disaster-orange/20">
              <div className="flex items-start space-x-4">
                <div className="bg-disaster-orange rounded-lg p-3">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Peringatan Dini
                  </h4>
                  <p className="text-sm text-gray-700">
                    Potensi hujan lebat dengan intensitas sedang hingga tinggi
                    di wilayah ini pada hari Selasa dan Jumat. Waspada banjir
                    dan longsor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-disaster-orange/20 to-disaster-orange/5 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Cloud className="w-16 h-16 text-disaster-orange" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Sistem Monitoring Cuaca
                </h3>
                <p className="text-gray-600 mb-6">
                  Data real-time dari stasiun meteorologi untuk peringatan dini
                  bencana alam
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-disaster-orange">
                      85%
                    </div>
                    <div className="text-sm text-gray-600">Kelembaban</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-disaster-orange">
                      20
                    </div>
                    <div className="text-sm text-gray-600">km/jam</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
              <Thermometer className="w-6 h-6 text-disaster-orange" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
              <Wind className="w-6 h-6 text-disaster-orange" />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#tentang-kami"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Dapatkan Peringatan Cuaca</span>
            <Droplets className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
