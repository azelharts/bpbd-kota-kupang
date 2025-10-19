// app/page.tsx

import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import WeatherForecast from "@/components/WeatherForecast";

import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section id="beranda">
        <HeroCarousel />
      </section>

      <WeatherForecast />

      <section id="tentang-kami" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-disaster-orange/10 px-4 py-2 rounded-full mb-4">
              <User className="w-5 h-5 text-disaster-orange" />
              <span className="text-sm font-medium text-disaster-orange">
                Tentang Kami
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sistem Informasi Kebencanaan Kota Kupang
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SIncan-KotaKu - Optimalisasi Sistem Layanan pada BPBD Kota Kupang
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-disaster-orange/10 to-disaster-orange/5 rounded-2xl p-8 border border-disaster-orange/20">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-disaster-orange rounded-lg p-3 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Visi Kami
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Menjadi sistem informasi kebencanaan yang terintegrasi,
                      akurat, dan dapat diandalkan untuk mendukung pengambilan
                      keputusan yang tepat dalam penanggulangan bencana.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Latar Belakang
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Penanganan bencana perlu didukung oleh kemampuan
                    mengumpulkan dan menyediakan data dan informasi yang akurat,
                    sehingga dalam melakukan perencanaan, pelaksanaan maupun
                    antisipasi penanganan bencana dapat dilakukan dengan baik,
                    begitupun informasi yang diberikan atau dikeluarkan untuk
                    masyarakat juga merupakan informasi yang valid dan akurat.
                  </p>
                  <p>
                    Sampai sekarang, format data dan informasi bencana juga
                    masih beragam, ditambah perkembangan teknologi informasi
                    yang sangat cepat dan telah masuk keberbagai bidang
                    kehidupan, menjadikan jarak, tempat, dan waktu bukan lagi
                    menjadi kendala yang berarti, maka penyebaran informasi
                    kebencanaan yang resmi oleh pemerintah sangat diperlukan
                    untuk menghindari penyebaran informasi yang tidak benar yang
                    dapat menyebabkan kepanikan dimasyarakat.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Regulasi Pendukung
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-disaster-orange rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Peraturan Presiden nomor 95 tahun 2018 - Sistem
                      Pemerintahan Berbasis Elektronik
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-disaster-orange rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Peraturan Kepala BNPB nomor 9 Tahun 2013 - Pedoman
                      Pengelolaan Informasi dan Dokumentasi
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-disaster-orange rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Perka Nomor 8 Tahun 2014 - Pedoman Pengelolaan Teknologi
                      Informasi Kebencanaan
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-disaster-orange rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Peraturan BNPB Nomor 1 Tahun 2023 - Satu Data Bencana
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-disaster-orange/10 rounded-2xl p-8 border border-disaster-orange/20">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Sistem Informasi Kebencanaan Kota Kupang
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Berangkat dari keadaan tersebut di atas, perlu dibuatkan
                  sebuah sistem informasi pada BPBD Kota Kupang sebagai sebuah
                  sarana penyimpanan data dan informasi kebencanaan berbasis
                  digital.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Sistem ini akan menjadi database kebencanaan, sebagai media
                  integrasi bagi pakai data dan informasi, serta media publikasi
                  kepada masyarakat, yang secara keseluruhan merupakan bagian
                  dari Penyelenggaraan Penanggulangan Bencana.
                </p>
              </div>

              <div className="bg-gradient-to-r from-disaster-orange to-disaster-orange-light rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">SIncan-KotaKu</h4>
                    <p className="text-sm opacity-90">
                      Ver 1.0 ~ copyright bpbdkotakupang@2024
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">BPBD</div>
                    <div className="text-sm opacity-90">Kota Kupang</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
