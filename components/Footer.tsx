// components/Footer.tsx

export default function Footer() {
  return (
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
                <p className="text-sm text-gray-400">
                  Badan Penanggulangan Bencana Daerah
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Melayani masyarakat dalam penanggulangan bencana alam dan keadaan
              darurat.
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
              <p>Kota Kupang, Provinsi NTT, Indonesia</p>
              <p>Kode Pos: 12345</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 BPBD - Badan Penanggulangan Bencana Daerah. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
