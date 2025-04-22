import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-blue-700">Smart Inventory</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link href="/add" className="text-green-600 hover:underline">
          Add Product
        </Link>
      </nav>
    </header>
  );
}
