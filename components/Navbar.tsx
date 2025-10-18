"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#cuaca", label: "Info Cuaca" },
    { href: "#tentang-kami", label: "Tentang Kami" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center relative">
              <Image
                src="/assets/logo-bpbd.png"
                fill
                alt="logo bpbd"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                BPBD KOTA KUPANG
              </h1>
              <p className="text-[10.5px] text-gray-600">
                Badan Penanggulangan Bencana Daerah
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-disaster-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Section */}
            {session ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 bg-disaster-orange text-white rounded-lg hover:bg-disaster-orange/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{session.user.username}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-disaster-orange transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-disaster-orange transition-colors px-2 py-2"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {session ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-disaster-orange text-white rounded-lg hover:bg-disaster-orange/90 transition-colors w-full justify-center"
                >
                  <User className="w-4 h-4" />
                  <span>{session.user.username}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-disaster-orange transition-colors px-2 py-2"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
