// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="text-lg font-bold">BPBD Kota Kupang</h3>
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
              <p>Call Center BPBD: +6281239940976</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Alamat Kantor</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Jalan Sam Ratulangi III, Nomor 7, Kelapa Lima,</p>
              <p>Kota Kupang, Nusa Tenggara Timur, Indonesia</p>
              <p>Kode Pos: 85228</p>
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
