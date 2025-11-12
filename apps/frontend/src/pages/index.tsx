import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pricing Dashboard</h1>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">
        <Link href="/pricing">Go to Pricing Module (View as Supplier001)</Link>
      </button>
    </main>
  );
}
