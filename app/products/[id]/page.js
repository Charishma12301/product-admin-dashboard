"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getProductById } from "../../../lib/productApi";
import Navbar from "../../../components/Navbar";

export default function ProductDetailsPage() {
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

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <Navbar />

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-red-600">{error}</p>

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

      <button
        onClick={() => router.push("/products")}
        className="mb-6 rounded border bg-white px-4 py-2"
      >
        ← Back to Products
      </button>

      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <div className="grid gap-8 md:grid-cols-2">
          
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-80 w-full rounded-lg object-cover"
            />

            {product.images?.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-20 w-full rounded object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {product.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Category: {product.category}
            </p>

            <p className="mt-4 text-2xl font-bold">
              ${product.price}
            </p>

            <p className="mt-2">
              ⭐ {product.rating}
            </p>

            <p className="mt-2">
              Stock: {product.stock}
            </p>

            <p className="mt-6 text-gray-700">
              {product.description}
            </p>

            {product.reviews?.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">
                  Reviews
                </h2>

                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="rounded border p-4"
                    >
                      <p className="font-medium">
                        {review.reviewerName}
                      </p>

                      <p className="mt-1">
                        ⭐ {review.rating}
                      </p>

                      <p className="mt-2 text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}