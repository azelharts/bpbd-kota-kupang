import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BPBD - Badan Penanggulangan Bencana Daerah',
  description: 'Website resmi Badan Penanggulangan Bencana Daerah untuk informasi dan penanggulangan bencana',
  keywords: 'bencana, tanggap darurat, BPBD, penanggulangan bencana, alam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-disaster-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BP</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BPBD</h1>
                  <p className="text-xs text-gray-600">Badan Penanggulangan Bencana Daerah</p>
                </div>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#beranda" className="text-gray-700 hover:text-disaster-orange transition-colors">Beranda</a>
                <a href="#cuaca" className="text-gray-700 hover:text-disaster-orange transition-colors">Info Cuaca</a>
                <a href="#tentang-kami" className="text-gray-700 hover:text-disaster-orange transition-colors">Tentang Kami</a>
                <a href="#kontak" className="text-gray-700 hover:text-disaster-orange transition-colors">Kontak</a>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-16">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-disaster-orange rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">BP</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">BPBD</h3>
                    <p className="text-sm text-gray-400">Badan Penanggulangan Bencana Daerah</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Melayani masyarakat dalam penanggulangan bencana alam dan keadaan darurat.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Layanan Darurat</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Call Center: 112</p>
                  <p>Hotline BPBD: (021) 123-4567</p>
                  <p>Email: info@bpbd.go.id</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Alamat Kantor</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Jl. Pahlawan No. 123</p>
                  <p>Kota Provinsi, Indonesia</p>
                  <p>Kode Pos: 12345</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 BPBD - Badan Penanggulangan Bencana Daerah. Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}