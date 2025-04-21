import Link from 'next/link';

export default function ProductCard({ product, onDelete }) {
  const { id, name, quantity, expDate, imgUrl } = product;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[250px]">
      <img
        src={imgUrl || '/placeholder.png'}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        <p className="text-sm text-gray-600">Expiry: {expDate}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link
          href={`/edit/${id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
