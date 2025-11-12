import { useGetProductsBySupplierQuery } from "@/store/api/pricingApi";

export const Pricing = () => {
  const loggedInSupplierId = "SUPPLIER001";
  const { data } = useGetProductsBySupplierQuery(loggedInSupplierId);
  console.log("Fetched products:", data);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Products for {loggedInSupplierId}
      </h2>
      {/* <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Product ID</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Base Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${product.basePrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
