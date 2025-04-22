// lib/api.js
import axios from 'axios';

const API_URL = 'https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products';

// Get all products
export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
};

// Get a single product by ID
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return await res.json();
};

// Create a new product
export const createProduct = async (productData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return await res.json();
};

// Update a product
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return await res.json();
};

// Delete a product
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return await res.json();
};

