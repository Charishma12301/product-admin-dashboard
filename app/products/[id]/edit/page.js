"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProductById,
  updateProduct,
} from "../../../../lib/productApi";

import Navbar from "../../../../components/Navbar";
import ProductForm from "../../../../components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setAuthenticated(true);
  }, [router]);

  useEffect(() => {
    if (!authenticated || !params.id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(params.id);

        setProduct(data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("Product not found");
        } else {
          setError("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [authenticated, params.id]);

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      setError("");

      await updateProduct(
        params.id,
        updatedProduct
      );

      router.push("/products");
    } catch (error) {
      console.error(error);
      setError(
        "Failed to update product. Please try again."
      );
    }
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <Navbar />
        <p>Loading product...</p>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <Navbar />

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-red-600">
            {error}
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-4 rounded bg-black px-4 py-2 text-white"
          >
            Back to Products
          </button>
        </div>
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
          Edit Product
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          submitText="Update Product"
        />
      </div>
    </main>
  );
}