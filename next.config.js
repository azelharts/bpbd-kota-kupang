/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "res.cloudinary.com",
    ],
  },
  env: {
    SESSION_PASSWORD:
      process.env.SESSION_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5432/bpbd_db",
  },
};

module.exports = nextConfig;
