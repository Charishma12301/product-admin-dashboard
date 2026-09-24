"use client";

import { useState } from "react";

export default function ProductForm({
  initialData = {},
  onSubmit,
  submitText = "Save Product",
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [category, setCategory] = useState(
    initialData.category || ""
  );
  const [stock, setStock] = useState(initialData.stock || "");
  const [description, setDescription] = useState(
    initialData.description || ""
  );

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (price === "" || Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    if (stock === "" || Number(stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!validate()) return;

    setSaving(true);

    try {
      await onSubmit({
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),
        description: description.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 shadow"
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter product title"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter price"
            min="0"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter category"
          />

          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter stock"
            min="0"
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stock}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter product description"
            rows="5"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}