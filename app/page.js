'use client';
// app/page.js
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../lib/api';  // Relative path to api.js
import ProductTable from '../components/ProductTable';  // Relative path to ProductTable.js
import ConfirmModal from '../components/ConfirmModal';  // Relative path to ConfirmModal.js
import { toast } from 'react-toastify';

export default function Dashboard() {
   
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch {
        toast.error('Failed to fetch products');
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDeleteClick = (id) => {
      setSelectedProductId(id);
      setIsModalOpen(true);
    };
  
    const confirmDelete = async () => {
      try {
        await deleteProduct(selectedProductId);
        toast.success('Product deleted!');
        setProducts(products.filter(p => p.id !== selectedProductId));
      } catch {
        toast.error('Failed to delete product');
      } finally {
        setIsModalOpen(false);
        setSelectedProductId(null);
      }
    };
  
    return (
      <section>
        <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
        <ProductTable products={products} onDelete={handleDeleteClick} />
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this product?"
        />
      </section>
    );
  }
  


  