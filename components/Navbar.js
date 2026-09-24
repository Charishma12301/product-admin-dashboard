"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.replace("/login");
  };

  return (
    <nav className="mb-6 flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow">
      <h2 className="text-lg font-bold">
        Product Admin
      </h2>

      <button
        onClick={handleLogout}
        className="rounded bg-black px-4 py-2 text-sm text-white hover:opacity-80"
      >
        Logout
      </button>
    </nav>
  );
}
