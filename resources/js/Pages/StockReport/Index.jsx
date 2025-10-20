import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function StockReportIndex({ auth, stocks, stats }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(stocks);

  // Filter stok berdasarkan pencarian
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      setFilteredStocks(
        stocks.filter(stock => 
          stock.name.toLowerCase().includes(term.toLowerCase()) ||
          (stock.sku && stock.sku.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Stok</h2>}
    >
      <Head title="Laporan Stok" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Statistik Stok */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
              <div className="text-gray-500 text-sm">Total Item</div>
              <div className="text-3xl font-bold">{stats.totalItems}</div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
              <div className="text-gray-500 text-sm">Item Stok Rendah</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.lowStockItems}</div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
              <div className="text-gray-500 text-sm">Total Kuantitas</div>
              <div className="text-3xl font-bold">{stats.totalQuantity}</div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau SKU..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full md:w-1/3 px-4 py-2 border rounded-md"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStocks.length > 0 ? (
                      filteredStocks.map(stock => (
                        <tr key={stock.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{stock.sku || '-'}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{stock.description || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stock.quantity <= stock.min_quantity ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                              {stock.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{stock.min_quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {stock.quantity <= stock.min_quantity ? (
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Stok Rendah</span>
                            ) : (
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Stok Cukup</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          Tidak ada data stok yang ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}