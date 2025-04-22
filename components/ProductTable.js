import Link from "next/link";

export default function ProductTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="w-full table-auto border-collapse text-sm text-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Image</th>
            <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Name</th>
            <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Quantity</th>
            <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Expiry Date</th>
            <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 hover:text-black transition-all">
              <td className="border border-gray-300 px-6 py-4 text-center">
                <img
                  src={p.imgUrl || 'placeholder.jpg'}
                  alt={p.name}
                  className="h-16 w-16 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-6 py-4">{p.name}</td>
              <td className="border border-gray-300 px-6 py-4">{p.quantity}</td>
              <td className="border border-gray-300 px-6 py-4">{p.expDate}</td>
              <td className="border border-gray-300 px-6 py-4">
                <div className="flex justify-center items-center space-x-4">
                  <Link href={`/edit/${p.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
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
