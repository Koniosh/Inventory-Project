'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct } from '../../../lib/api';
import { toast } from 'react-toastify';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    name: '',
    quantity: '',
    expDate: '',
    imgUrl: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setForm({
          name: product.name || '',
          quantity: product.quantity || '',
          expDate: product.expDate || '',
          imgUrl: product.imgUrl || ''
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch product');
        router.push('/');
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      toast.success('Product updated!');
      router.push('/');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 sm:px-4 md:px-6 lg:px-8 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            name="expDate"
            id="expDate"
            value={form.expDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Image URL"
            value={form.imgUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
