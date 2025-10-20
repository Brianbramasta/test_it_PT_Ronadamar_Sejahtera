import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, stock }) {
  const { data, setData, put, processing, errors } = useForm({
    sku: stock.sku || '',
    name: stock.name || '',
    description: stock.description || '',
    min_quantity: stock.min_quantity || 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.stocks.update', stock.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Stok</h2>}
    >
      <Head title="Edit Stok" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    value={data.sku}
                    onChange={(e) => setData('sku', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.sku && <div className="text-red-500 text-sm mt-1">{errors.sku}</div>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows="3"
                  />
                  {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>

                <div>
                  <label htmlFor="min_quantity" className="block text-sm font-medium text-gray-700">Jumlah Stok Minimal</label>
                  <input
                    type="number"
                    id="min_quantity"
                    value={data.min_quantity}
                    onChange={(e) => setData('min_quantity', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="0"
                  />
                  {errors.min_quantity && <div className="text-red-500 text-sm mt-1">{errors.min_quantity}</div>}
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="bg-gray-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}