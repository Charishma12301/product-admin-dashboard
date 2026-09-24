"use client";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div className="hidden overflow-x-auto rounded-lg bg-white shadow md:block">
      <table className="w-full text-left">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>

              <td className="p-4 font-medium">
                <a
                  href={`/products/${product.id}`}
                  className="hover:underline"
                >
                  {product.title}
                </a>
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                ${product.price}
              </td>

              <td className="p-4">
                ⭐ {product.rating}
              </td>

              <td className="p-4">
                {product.stock}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}