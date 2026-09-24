"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium">
        Search products
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by product name..."
        className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2"
      />
    </div>
  );
}
