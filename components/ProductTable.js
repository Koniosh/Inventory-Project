import Link from "next/link";

export default function ProductTable({ products, onDelete }) {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr className="bg-gray-100">
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Expiry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* {products.map(p => (
          <tr key={p.id} className="text-center border-t">
            <td>
              <img
                src={p.imgUrl || '/placeholder.png'}
                alt={p.name}
                className="h-12 mx-auto object-cover"
              />
            </td>
            <td>{p.name}</td>
            <td>{p.quantity}</td>
            <td>{p.expDate}</td>
            <td>
              <Link href={`/edit/${p.id}`} className="text-blue-600 hover:underline mr-3">
                Edit
              </Link>
              <button
                onClick={() => onDelete(p.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}
