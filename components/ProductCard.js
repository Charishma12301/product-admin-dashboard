"use client";

export default function ProductCard({
  products,
  onDelete,
}) {
  return (
    <div className="grid gap-4 md:hidden">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-lg bg-white p-4 shadow"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="mb-3 h-40 w-full rounded object-cover"
          />

          <h2 className="font-semibold">
            <a
              href={`/products/${product.id}`}
              className="hover:underline"
            >
              {product.title}
            </a>
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Category: {product.category}
          </p>

          <p className="mt-1">
            Price: ${product.price}
          </p>

          <p className="mt-1">
            Rating: ⭐ {product.rating}
          </p>

          <p className="mt-1">
            Stock: {product.stock}
          </p>

          <div className="mt-4 flex gap-2">
            <a
              href={`/products/${product.id}/edit`}
              className="rounded border px-3 py-2 text-sm hover:bg-gray-100"
            >
              Edit
            </a>

            <button
              onClick={() => onDelete(product.id)}
              className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}