"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { addProduct } from "../../../lib/productApi";
import Navbar from "../../../components/Navbar";
import ProductForm from "../../../components/ProductForm";

export default function AddProductPage() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setAuthenticated(true);
  }, [router]);

  const handleAddProduct = async (product) => {
    try {
      setError("");

      await addProduct(product);

      router.push("/products");
    } catch (error) {
      console.error(error);
      setError("Failed to add product. Please try again.");
    }
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.push("/products")}
          className="mb-6 rounded border bg-white px-4 py-2"
        >
          ← Back to Products
        </button>

        <h1 className="mb-6 text-2xl font-bold">
          Add Product
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <ProductForm
          onSubmit={handleAddProduct}
          submitText="Add Product"
        />
      </div>
    </main>
  );
}