import React, { useEffect, useState } from "react";

const Index = ({ handleFetch, products, ModalWrapper, FilterBox }) => {
  const [data, setData] = useState(null);
   const [filterValue, setFilterValue] = useState({
      product: null,
    });

  const fetchData = async () => {
    const resp = await handleFetch("GET", `/erp/stock/dashboard/stockvalue/${filterValue?.product}`);

    setData(resp?.stockValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-transparent p-4 rounded-2xl shadow-sm xl:w-[48%] border border-gray-300">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">
          Warehouse wise Stock Value
        </h2>
        <ModalWrapper
            Comp={FilterBox}
            title={"Warehouse wise Stock Value"}
            products={products}
            handleSet={fetchData}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
      </div>

      <div className="h-48 overflow-y-auto bg-transparent">
        <table className="w-full text-left table-auto text-xs text-gray-700">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-2">Warehouse</th>
              <th className="p-2">Stock Value</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((warehouse, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{`${warehouse.area}, ${warehouse.city}`}</td>
                <td className="p-2">{warehouse.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
