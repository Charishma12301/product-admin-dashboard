"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  getProducts,
  searchProducts,
  getCategories,
  deleteProduct,
} from "../../lib/productApi";

import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import ProductFilters from "../../components/ProductFilters";
import ProductTable from "../../components/ProductTable";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import StatusMessage from "../../components/StatusMessage";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [authenticated, setAuthenticated] = useState(false);

  const pageParam = Number(searchParams.get("page"));
  const limitParam = Number(searchParams.get("limit"));

  const page =
    Number.isInteger(pageParam) && pageParam > 0
      ? pageParam
      : 1;

  const limit =
    [10, 20, 50].includes(limitParam)
      ? limitParam
      : 10;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(search);

  const [total, setTotal] = useState(0);

  const updateUrl = (updates) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setAuthenticated(true);
  }, [router]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (authenticated) {
      loadCategories();
    }
  }, [authenticated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateUrl({
          search: searchInput,
          page: 1,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (!authenticated) return;

    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let data;

        if (search.trim()) {
          data = await searchProducts(
            search,
            limit,
            (page - 1) * limit,
            controller.signal
          );
        } else {
          data = await getProducts(
            limit,
            (page - 1) * limit
          );
        }

        let productList = data.products || [];

        if (category) {
          productList = productList.filter(
            (product) => product.category === category
          );
        }

        productList = [...productList].sort(
          (a, b) => {
            switch (sort) {
              case "price-asc":
                return a.price - b.price;

              case "price-desc":
                return b.price - a.price;

              case "rating-asc":
                return a.rating - b.rating;

              case "rating-desc":
                return b.rating - a.rating;

              case "title-asc":
                return a.title.localeCompare(b.title);

              case "title-desc":
                return b.title.localeCompare(a.title);

              default:
                return 0;
            }
          }
        );

        setProducts(productList);

        setTotal(
          category
            ? productList.length
            : data.total || 0
        );
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error(error);

        setError(
          "Failed to load products. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [
    authenticated,
    page,
    limit,
    search,
    category,
    sort,
  ]);

  useEffect(() => {
    if (!loading && total > 0) {
      const totalPages = Math.ceil(total / limit);

      if (page > totalPages) {
        updateUrl({
          page: totalPages,
        });
      }
    }
  }, [loading, total, limit, page]);

  const handlePageChange = (newPage) => {
    updateUrl({
      page: newPage,
    });
  };

  const handlePageSizeChange = (newLimit) => {
    updateUrl({
      limit: newLimit,
      page: 1,
    });
  };

  const handleCategoryChange = (newCategory) => {
    updateUrl({
      category: newCategory,
      page: 1,
    });
  };

  const handleSortChange = (newSort) => {
    updateUrl({
      sort: newSort,
      page: 1,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to delete product. Please try again."
      );
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Checking authentication...</p>
      </main>
    );
  }

  const totalPages =
    total > 0
      ? Math.ceil(total / limit)
      : 1;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <button
          onClick={() => router.push("/products/add")}
          className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
        >
          + Add Product
        </button>
      </div>

      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
      />

      <ProductFilters
        categories={categories}
        category={category}
        sort={sort}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {error ? (
        <StatusMessage
          type="error"
          message={error}
          onRetry={handleRetry}
        />
      ) : loading ? (
        <StatusMessage type="loading" />
      ) : products.length === 0 ? (
        <StatusMessage
          type="empty"
          message="No products found."
        />
      ) : (
        <>
          <ProductTable
            products={products}
            onDelete={handleDelete}
          />

          <ProductCard
            products={products}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            limit={limit}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </main>
  );
}