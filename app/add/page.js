'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    expDate: '',
    imgUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setForm((prev) => ({ ...prev, imgUrl: url })); // Mocking upload
    }
  };

  const validateForm = () => {
    if (!form.name || !form.quantity || !form.expDate) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (isNaN(form.quantity) || form.quantity <= 0) {
      toast.error('Quantity must be a positive number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to add product');

      toast.success('Product added!');
      router.push('/'); // Redirect to the main page
    } catch (error) {
      toast.error('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    router.push('/'); // Redirect to the main page without submitting the form
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload Preview */}
        <div>
          <label className="block mb-1 font-medium">Upload Product Image (Mock)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
          )}
        </div>

        {/* Manual Form Inputs */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            name="expDate"
            value={form.expDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {/* Redirect Button */}
      <button
        onClick={handleRedirect}
        className="mt-4 w-full py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
