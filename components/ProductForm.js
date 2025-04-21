import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, updateProduct } from '@/lib/api';
import { toast } from 'react-toastify';

export default function ProductForm({ product = {}, isEdit = false }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name || '',
    imgUrl: product.imgUrl || '',
    quantity: product.quantity || '',
    expDate: product.expDate || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(product.id, form);
        toast.success('Product updated!');
      } else {
        await addProduct(form);
        toast.success('Product added!');
      }
      router.push('/');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="imgUrl" placeholder="Image URL" value={form.imgUrl} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="expDate" type="date" value={form.expDate} onChange={handleChange} required className="w-full border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEdit ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}
