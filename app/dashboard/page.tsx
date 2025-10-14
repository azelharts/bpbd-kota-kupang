'use client'

import React from 'react';
import { FileText, Cloud, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const stats = [
    {
      title: 'Data Kejadian & Dampak Bencana',
      value: '24',
      description: 'Total kejadian bencana tahun ini',
      icon: FileText,
      color: 'bg-red-500',
      href: '/dashboard/input-kejadian',
    },
    {
      title: 'Data Prakiraan Cuaca',
      value: '7',
      description: 'Hari prakiraan cuaca aktif',
      icon: Cloud,
      color: 'bg-blue-500',
      href: '/dashboard/update-cuaca',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'kejadian',
      title: 'Update Data Banjir Jakarta',
      timestamp: '2 jam yang lalu',
      status: 'success',
    },
    {
      id: 2,
      type: 'cuaca',
      title: 'Perbarui Prakiraan Cuaca Mingguan',
      timestamp: '5 jam yang lalu',
      status: 'success',
    },
    {
      id: 3,
      type: 'kejadian',
      title: 'Input Data Tanah Longsor Bandung',
      timestamp: '1 hari yang lalu',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-disaster-orange font-medium">Beranda</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard BPBD Kota Kupang</h1>
        <p className="text-gray-600">Selamat datang di sistem informasi kebencanaan SIncan-KotaKu</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-gray-600 mb-4">{stat.description}</p>
              <Link
                href={stat.href}
                className="inline-flex items-center text-disaster-orange hover:text-disaster-orange-dark font-medium transition-colors"
              >
                Lihat Detail
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/input-kejadian"
            className="flex items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 font-medium">Input Kejadian Bencana</span>
          </Link>
          <Link
            href="/dashboard/update-cuaca"
            className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
          >
            <Cloud className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">Update Data Cuaca</span>
          </Link>
          <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Tim Siaga: 24 Orang</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activity.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status === 'success' ? 'Selesai' : 'Dalam Proses'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}