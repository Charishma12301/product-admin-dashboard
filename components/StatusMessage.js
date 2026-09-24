"use client";

export default function StatusMessage({
  type,
  message,
  onRetry,
}) {
  if (type === "loading") {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <p className="font-medium">
          Loading products...
        </p>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <p className="font-medium">
          {message || "No products found."}
        </p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <p className="font-medium text-red-600">
          {message || "Something went wrong."}
        </p>

        <button
          onClick={onRetry}
          className="mt-4 rounded bg-black px-4 py-2 text-sm text-white hover:opacity-80"
        >
          Retry
        </button>
      </div>
    );
  }

  return null;
}