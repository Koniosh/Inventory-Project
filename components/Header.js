import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white hover:text-yellow-400 transition-all">
          Smart Inventory
        </h1>
        <nav className="space-x-6">
          <Link href="/" className="text-white hover:text-yellow-400 hover:underline transition-all">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
