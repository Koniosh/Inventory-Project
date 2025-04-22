'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, deleteProduct } from '../lib/api';
import ProductTable from '../components/ProductTable';
import ConfirmModal from '../components/ConfirmModal';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterRange, setFilterRange] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);  // To control filter dropdown visibility
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);  // To control sort dropdown visibility

  const fetchData = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
      setFilteredProducts(res);
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
      const updatedProducts = products.filter((p) => p.id !== selectedProductId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setIsModalOpen(false);
      setSelectedProductId(null);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) => {
      const dateA = new Date(a.expDate);
      const dateB = new Date(b.expDate);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredProducts(sorted);
    setIsSortDropdownOpen(false);  // Close the dropdown after selecting
  };

  const handleFilterChange = (range) => {
    setFilterRange(range);
    const now = new Date();
    let filtered = [];
    switch (range) {
      case '7days':
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        filtered = products.filter((p) => new Date(p.expDate) <= next7Days);
        break;
      case '1month':
        const next1Month = new Date();
        next1Month.setMonth(now.getMonth() + 1);
        filtered = products.filter((p) => new Date(p.expDate) <= next1Month);
        break;
      case '6months':
        const next6Months = new Date();
        next6Months.setMonth(now.getMonth() + 6);
        filtered = products.filter((p) => new Date(p.expDate) <= next6Months);
        break;
      default:
        filtered = products;
    }
    setFilteredProducts(filtered);
    setIsFilterDropdownOpen(false);  // Close the dropdown after selecting
  };

  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen);  // Toggle filter dropdown visibility
  const toggleSortDropdown = () => setIsSortDropdownOpen(!isSortDropdownOpen);  // Toggle sort dropdown visibility

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Dashboard</h1>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* Filter + Sort Controls */}
        <div className="flex gap-4 flex-wrap">
          {/* Filter Dropdown */}
          <div className="relative inline-block w-48">
            <button
              onClick={toggleFilterDropdown}
              className="w-full px-4 py-2 border rounded-md bg-white text-black shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterRange || 'Select a Range'}
              <span className="absolute right-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path d="M1 4.5a.5.5 0 0 1 .854-.354L8 9.293l6.146-5.146a.5.5 0 0 1 .708.708l-6.5 6.5a.5.5 0 0 1-.708 0l-6.5-6.5A.5.5 0 0 1 1 4.5z"/>
                </svg>
              </span>
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFilterChange('7days')}
                  >
                    Within 7 Days
                  </li>
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFilterChange('1month')}
                  >
                    Within 1 Month
                  </li>
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFilterChange('6months')}
                  >
                    Within 6 Months
                  </li>
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleFilterChange('')}
                  >
                    All
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-block w-48">
            <button
              onClick={toggleSortDropdown}
              className="w-full px-4 py-2 border rounded-md bg-white text-black shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOrder === 'asc' ? 'Oldest to Newest' : 'Newest to Oldest'}
              <span className="absolute right-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path d="M1 4.5a.5.5 0 0 1 .854-.354L8 9.293l6.146-5.146a.5.5 0 0 1 .708.708l-6.5 6.5a.5.5 0 0 1-.708 0l-6.5-6.5A.5.5 0 0 1 1 4.5z"/>
                </svg>
              </span>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('asc')}
                  >
                    Oldest to Newest
                  </li>
                  <li
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('desc')}
                  >
                    Newest to Oldest
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Add Product Button */}
        <Link href="/add">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable products={filteredProducts} onDelete={handleDeleteClick} />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
