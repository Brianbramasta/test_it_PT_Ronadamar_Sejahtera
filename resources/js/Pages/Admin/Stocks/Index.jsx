import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function StocksIndex({ auth, stocks, flash }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [adjustValues, setAdjustValues] = useState({});

  useEffect(() => {
    setFilteredStocks(
      stocks.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (stock.sku && stock.sku.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, stocks]);

  const handleAdjustChange = (id, value) => {
    setAdjustValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAdjustSubmit = (id) => {
    const change = parseInt(adjustValues[id] || 0);
    if (change === 0) return;
    
    router.post(route('admin.stocks.adjust', id), { 
      change: change,
      note: `Adjusted by ${change}` 
    });
    
    // Reset the input after submission
    setAdjustValues(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus stok ini?')) {
      router.delete(route('admin.stocks.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Stok</h2>}
    >
      <Head title="Manajemen Stok" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {flash?.message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {flash.message}
            </div>
          )}

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama atau SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <Link
                  href={route('admin.stocks.create')}
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Tambah Stok Baru
                </Link>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <div className="flex items-center space-x-1">
                                <input
                                  type="number"
                                  value={adjustValues[stock.id] || ''}
                                  onChange={(e) => handleAdjustChange(stock.id, e.target.value)}
                                  className="w-16 px-2 py-1 border rounded text-sm"
                                  placeholder="Jumlah"
                                />
                                <button
                                  onClick={() => handleAdjustSubmit(stock.id)}
                                  className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-sm"
                                  disabled={!adjustValues[stock.id]}
                                >
                                  Submit
                                </button>
                              </div>
                              <Link
                                href={route('admin.stocks.edit', stock.id)}
                                className="text-indigo-600 hover:text-indigo-900 px-2 py-1"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(stock.id)}
                                className="text-red-600 hover:text-red-900 px-2 py-1"
                              >
                                Hapus
                              </button>
                            </div>
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
