"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import { getProductById } from "@/lib/api";

export default function EditPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {product ? <ProductForm product={product} isEdit /> : "Loading..."}
    </section>
  );
}
