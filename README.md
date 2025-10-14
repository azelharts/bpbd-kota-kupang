# BPBD Landing Page - Next.js 15 & TypeScript

Website resmi Badan Penanggulangan Bencana Daerah (BPBD) dengan desain modern dan responsive menggunakan Next.js 15 dan TypeScript.

## Fitur Utama

- ✅ **Hero Section dengan Carousel** - Tampilan dinamis dengan gambar bencana alam
- ✅ **Info Cuaca** - Prakiraan cuaca 5 hari dengan peringatan dini
- ✅ **Sistem Autentikasi** - Login admin dengan session management
- ✅ **Dashboard Admin** - Panel administrasi untuk manajemen data
- ✅ **Input Data Kejadian** - Formulir pelaporan bencana alam
- ✅ **Update Data Cuaca** - Formulir pembaruan prakiraan cuaca
- ✅ **Desain Responsive** - Kompatibel dengan semua perangkat
- ✅ **Warna Tema** - Kombinasi putih dan oranye yang modern
- ✅ **Konten Indonesia** - Semua konten dalam bahasa Indonesia
- ✅ **TypeScript** - Kode yang type-safe dan maintainable

## Teknologi yang Digunakan

- **Next.js 15** - Framework React terbaru dengan App Router
- **TypeScript** - Type safety untuk pengembangan yang lebih baik
- **Tailwind CSS** - Utility-first CSS framework
- **PostgreSQL** - Database relasional untuk penyimpanan data
- **Iron Session** - Session management yang aman
- **Embla Carousel** - Carousel yang ringan dan customizable
- **Lucide React** - Ikon modern dan konsisten

## Instalasi & Menjalankan Project

### Prasyarat
- Node.js 18+ 
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download project ini**
   ```bash
   git clone [url-repository]
   cd disaster-management-landing
   ```

2. **Setup Database PostgreSQL**
   - Install PostgreSQL di sistem Anda
   - Buat database dengan nama `bpbd_db`
   - Copy `.env.example` menjadi `.env` dan sesuaikan konfigurasi database

3. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka browser dan akses**
   ```
   http://localhost:3000
   ```

6. **Login ke Dashboard**
   - Akses `/login` untuk masuk ke dashboard admin
   - Gunakan kredensial demo: username `admin`, password `adminbpbd`

### Build untuk Production

```bash
npm run build
npm start
```

## Struktur Project

```
├── app/
│   ├── globals.css          # Global styles dengan Tailwind
│   ├── layout.tsx           # Root layout dengan navbar & footer
│   ├── page.tsx             # Halaman utama
│   ├── login/               # Halaman login
│   ├── dashboard/           # Dashboard admin
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard home
│   │   ├── input-kejadian/  # Form input data kejadian
│   │   └── update-cuaca/    # Form update data cuaca
│   └── api/
│       └── auth/            # API routes untuk autentikasi
├── components/
│   ├── HeroCarousel.tsx     # Hero section dengan carousel
│   └── WeatherForecast.tsx  # Section info cuaca
├── lib/                     # Library dan utilities
│   ├── db.ts               # Koneksi database PostgreSQL
│   └── auth.ts             # Konfigurasi session
├── types/                   # TypeScript type definitions
├── public/                  # Assets static
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Konfigurasi Tailwind
├── next.config.js           # Konfigurasi Next.js
└── tsconfig.json            # Konfigurasi TypeScript
```

## Kustomisasi

### Warna Theme
Warna tema dapat diubah di `tailwind.config.js`:
```javascript
colors: {
  'disaster-orange': '#FF6B35',
  'disaster-orange-light': '#FF8A65',
  'disaster-orange-dark': '#E55100',
}
```

### Konten Carousel
Edit file `components/HeroCarousel.tsx` untuk mengubah gambar dan konten carousel.

### Data Cuaca
Edit file `components/WeatherForecast.tsx` untuk mengubah data prakiraan cuaca.

## Fitur yang Dapat Dikembangkan

- [ ] Integrasi dengan API cuaca real-time
- [ ] Sistem notifikasi darurat
- [ ] Peta sebaran bencana
- [ ] Form pelaporan bencana
- [ ] Dashboard admin
- [ ] Multi-bahasa support

## Kontak

Untuk pertanyaan atau bantuan mengenai project ini, silakan hubungi tim pengembang BPBD.

---

© 2024 BPBD - Badan Penanggulangan Bencana Daerah