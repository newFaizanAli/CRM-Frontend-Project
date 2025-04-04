import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import StickyCard from "../../../../components/dasboard/card/smallcard";

const Index = () => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/stock/dashboard");
    const result = { ...resp };
    // console.log(result);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StickyCard title={"TOTAL PRODUCTS"} value={data?.products} />
        <StickyCard
          title={"LOW STOCK PRODUCTS"}
          value={data?.lowStockProducts?.length}
        />
        <StickyCard title={"TOTAL WAREHOUSES"} value={data?.warehouses} />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Low Stock Products Table */}
        <div className="bg-transparent p-4 rounded-2xl shadow-md xl:w-[48%] border border-gray-300">
          <h2 className="text-sm font-semibold mb-2">Low Stock Products</h2>

          <div className="h-48 overflow-y-auto bg-transparent">
            <table className="w-full text-left table-auto text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Low-Value</th>
                  <th className="p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data?.lowStockProducts?.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.code}</td>
                    <td className="p-2">{product.lowStockThreshold}</td>
                    <td className="p-2">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
