"use client";

export default function ProductFilters({
  categories,
  category,
  sort,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row">
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option
              key={item.slug || item}
              value={item.slug || item}
            >
              {item.name || item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </div>
    </div>
  );
}
