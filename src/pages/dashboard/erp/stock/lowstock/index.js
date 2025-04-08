import React, { useEffect, useState } from "react";

const Index = ({ handleFetch, warehouses, ModalWrapper, FilterBox }) => {
  const [data, setData] = useState(null);

  const [filterValue, setFilterValue] = useState({
    warehouse: null,
  });

  const fetchData = async () => {
    const resp = await handleFetch("GET", `/erp/stock/dashboard/lowstock/${filterValue?.warehouse}`);
    setData(resp?.lowStockProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-transparent p-4 rounded-2xl shadow-sm xl:w-[48%] border border-gray-300">
      {/* <h2 className="text-sm font-semibold mb-2">Low Stock Products</h2> */}
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">
          Item Shortage Summary
        </h2>
        <ModalWrapper
          Comp={FilterBox}
          title={"Item Shortage Summary"}
          warehouses={warehouses}
          handleSet={fetchData}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
          
        />
      </div>

      <div className="h-48 overflow-y-auto bg-transparent">
        <table className="w-full text-left table-auto text-xs text-gray-700">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Code</th>
              <th className="p-2">Low-Value</th>
              <th className="p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product) => (
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
  );
};

export default Index;
