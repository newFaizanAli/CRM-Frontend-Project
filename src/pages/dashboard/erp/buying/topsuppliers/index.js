import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Index = ({ handleFetch, suppliers, ModalWrapper, FilterBox }) => {
  const [topSupplier, setTopSupplier] = useState(null);
  const [filterValue, setFilterValue] = useState({
    supplier: null,
    startDate: null,
    endDate: null,
  });

  const fetchData = async () => {
    const resp = await handleFetch(
      "GET",
      `/erp/buying/dashboard/purchase/supplier/${filterValue["supplier"]}/${filterValue["startDate"]}/${filterValue["endDate"]}`
    );
    if (resp) setTopSupplier(resp);
  };

  const handleSet = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = topSupplier
    ? [
        {
          name: topSupplier?.supplierName,
          "Total Amount": topSupplier?.totalAmount,
          "Total Orders": topSupplier?.purchaseCount,
        },
      ]
    : [];

  return (
    <div className="w-full flex flex-col py-6 border border-gray-300 rounded-xl p-4  shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Top Supplier</h2>
        <ModalWrapper
          Comp={FilterBox}
          title={"Top Supplier"}
          suppliers={suppliers}
          handleSet={handleSet}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
      </div>

      {topSupplier && (
        <>
          <div className="">
            <div className="w-full w-[500px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total Amount" fill="#4F46E5" barSize={40} />
                  <Bar dataKey="Total Orders" fill="#14B8A6" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center space-y-2">
              <p className="text-md font-semibold text-indigo-600">
                {topSupplier?.supplierName}
              </p>
              <p className="text-sm text-gray-500">
                {topSupplier?.purchaseCount} Purchases — Rs.{" "}
                {topSupplier?.totalAmount?.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
