'use client'

import React, { useState } from 'react';
import { Save, AlertTriangle, MapPin, Calendar, Clock } from 'lucide-react';

export default function InputKejadianPage() {
  const [formData, setFormData] = useState({
    jenisBencana: '',
    lokasi: '',
    tanggal: '',
    waktu: '',
    deskripsi: '',
    korbanJiwa: '',
    kerugianMaterial: '',
    status: 'dalam penanganan',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setFormData({
        jenisBencana: '',
        lokasi: '',
        tanggal: '',
        waktu: '',
        deskripsi: '',
        korbanJiwa: '',
        kerugianMaterial: '',
        status: 'dalam penanganan',
      });
    }, 1500);
  };

  const jenisBencanaList = [
    'Banjir',
    'Tanah Longsor',
    'Gempa Bumi',
    'Kebakaran',
    'Angin Puting Beliung',
    'Kekeringan',
    'Tsunami',
    'Letusan Gunung Berapi',
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-disaster-orange font-medium">Input Data Kejadian</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-red-500 rounded-lg p-2">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Input Data Kejadian Bencana</h1>
            <p className="text-gray-600">Formulir pelaporan kejadian bencana alam</p>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Data kejadian berhasil disimpan!</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jenis Bencana */}
            <div>
              <label htmlFor="jenisBencana" className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Bencana <span className="text-red-500">*</span>
              </label>
              <select
                id="jenisBencana"
                name="jenisBencana"
                value={formData.jenisBencana}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                required
              >
                <option value="">Pilih jenis bencana</option>
                {jenisBencanaList.map((jenis) => (
                  <option key={jenis} value={jenis}>
                    {jenis}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status Penanganan <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                required
              >
                <option value="dalam penanganan">Dalam Penanganan</option>
                <option value="selesai">Selesai</option>
                <option value="dalam evaluasi">Dalam Evaluasi</option>
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Kejadian <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="lokasi"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="Contoh: Jl. Merdeka No. 1, Jakarta"
                  required
                />
              </div>
            </div>

            {/* Tanggal */}
            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Kejadian <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Waktu */}
            <div>
              <label htmlFor="waktu" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Kejadian <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="waktu"
                  name="waktu"
                  value={formData.waktu}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Korban Jiwa */}
            <div>
              <label htmlFor="korbanJiwa" className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Korban Jiwa
              </label>
              <input
                type="number"
                id="korbanJiwa"
                name="korbanJiwa"
                value={formData.korbanJiwa}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Kerugian Material */}
          <div>
            <label htmlFor="kerugianMaterial" className="block text-sm font-medium text-gray-700 mb-2">
              Kerugian Material (Rp)
            </label>
            <input
              type="number"
              id="kerugianMaterial"
              name="kerugianMaterial"
              value={formData.kerugianMaterial}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Kejadian <span className="text-red-500">*</span>
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
              placeholder="Jelaskan secara detail kejadian bencana..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  jenisBencana: '',
                  lokasi: '',
                  tanggal: '',
                  waktu: '',
                  deskripsi: '',
                  korbanJiwa: '',
                  kerugianMaterial: '',
                  status: 'dalam penanganan',
                });
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Data'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}