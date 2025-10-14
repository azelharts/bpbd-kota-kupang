'use client'

import React, { useState } from 'react';
import { Save, Cloud, Thermometer, Wind, Droplets, Eye } from 'lucide-react';

export default function UpdateCuacaPage() {
  const [formData, setFormData] = useState({
    tanggal: '',
    suhuMax: '',
    suhuMin: '',
    kelembaban: '',
    kecepatanAngin: '',
    arahAngin: '',
    tekananUdara: '',
    kondisiCuaca: '',
    visibility: '',
    uvIndex: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    }, 1500);
  };

  const kondisiCuacaList = [
    'Cerah',
    'Berawan',
    'Hujan Ringan',
    'Hujan Sedang',
    'Hujan Lebat',
    'Badai',
    'Kabut',
  ];

  const arahAnginList = [
    'Utara',
    'Timur Laut',
    'Timur',
    'Tenggara',
    'Selatan',
    'Barat Daya',
    'Barat',
    'Barat Laut',
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-disaster-orange font-medium">Update Data Cuaca</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-500 rounded-lg p-2">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Update Data Cuaca</h1>
            <p className="text-gray-600">Formulir pembaruan data prakiraan cuaca</p>
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
              <p className="text-sm font-medium text-green-800">Data cuaca berhasil diperbarui!</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tanggal */}
            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Prakiraan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                required
              />
            </div>

            {/* Kondisi Cuaca */}
            <div>
              <label htmlFor="kondisiCuaca" className="block text-sm font-medium text-gray-700 mb-2">
                Kondisi Cuaca <span className="text-red-500">*</span>
              </label>
              <select
                id="kondisiCuaca"
                name="kondisiCuaca"
                value={formData.kondisiCuaca}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                required
              >
                <option value="">Pilih kondisi cuaca</option>
                {kondisiCuacaList.map((kondisi) => (
                  <option key={kondisi} value={kondisi}>
                    {kondisi}
                  </option>
                ))}
              </select>
            </div>

            {/* Suhu Maksimum */}
            <div>
              <label htmlFor="suhuMax" className="block text-sm font-medium text-gray-700 mb-2">
                Suhu Maksimum (°C)
              </label>
              <div className="relative">
                <Thermometer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="suhuMax"
                  name="suhuMax"
                  value={formData.suhuMax}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="35"
                />
              </div>
            </div>

            {/* Suhu Minimum */}
            <div>
              <label htmlFor="suhuMin" className="block text-sm font-medium text-gray-700 mb-2">
                Suhu Minimum (°C)
              </label>
              <div className="relative">
                <Thermometer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="suhuMin"
                  name="suhuMin"
                  value={formData.suhuMin}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Kelembaban */}
            <div>
              <label htmlFor="kelembaban" className="block text-sm font-medium text-gray-700 mb-2">
                Kelembaban (%)
              </label>
              <div className="relative">
                <Droplets className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="kelembaban"
                  name="kelembaban"
                  value={formData.kelembaban}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="75"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Kecepatan Angin */}
            <div>
              <label htmlFor="kecepatanAngin" className="block text-sm font-medium text-gray-700 mb-2">
                Kecepatan Angin (km/jam)
              </label>
              <div className="relative">
                <Wind className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="kecepatanAngin"
                  name="kecepatanAngin"
                  value={formData.kecepatanAngin}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="15"
                />
              </div>
            </div>

            {/* Arah Angin */}
            <div>
              <label htmlFor="arahAngin" className="block text-sm font-medium text-gray-700 mb-2">
                Arah Angin
              </label>
              <select
                id="arahAngin"
                name="arahAngin"
                value={formData.arahAngin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
              >
                <option value="">Pilih arah angin</option>
                {arahAnginList.map((arah) => (
                  <option key={arah} value={arah}>
                    {arah}
                  </option>
                ))}
              </select>
            </div>

            {/* Tekanan Udara */}
            <div>
              <label htmlFor="tekananUdara" className="block text-sm font-medium text-gray-700 mb-2">
                Tekanan Udara (hPa)
              </label>
              <input
                type="number"
                id="tekananUdara"
                name="tekananUdara"
                value={formData.tekananUdara}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                placeholder="1013"
              />
            </div>

            {/* Visibility */}
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                Jarak Pandang (km)
              </label>
              <div className="relative">
                <Eye className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="visibility"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                  placeholder="10"
                />
              </div>
            </div>

            {/* UV Index */}
            <div>
              <label htmlFor="uvIndex" className="block text-sm font-medium text-gray-700 mb-2">
                UV Index
              </label>
              <input
                type="number"
                id="uvIndex"
                name="uvIndex"
                value={formData.uvIndex}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-disaster-orange focus:border-transparent"
                placeholder="7"
                min="0"
                max="11"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  tanggal: '',
                  suhuMax: '',
                  suhuMin: '',
                  kelembaban: '',
                  kecepatanAngin: '',
                  arahAngin: '',
                  tekananUdara: '',
                  kondisiCuaca: '',
                  visibility: '',
                  uvIndex: '',
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