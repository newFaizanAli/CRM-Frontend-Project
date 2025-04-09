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

const Index = ({ handleFetch, customers, ModalWrapper, FilterBox }) => {
  const [topCustomer, setTopCustomer] = useState(null);
  const [filterValue, setFilterValue] = useState({
    customer: null,
    startDate: null,
    endDate: null,
  });

  const fetchData = async () => {
    const resp = await handleFetch(
      "GET",
      `/erp/selling/dashboard/sales/customer/${filterValue["customer"]}/${filterValue["startDate"]}/${filterValue["endDate"]}`
    );
 
    if (resp) setTopCustomer(resp);
  };

  const handleSet = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = topCustomer
    ? [
        {
          name: topCustomer?.customerName,
          "Total Amount": topCustomer?.totalAmount,
          "Total Orders": topCustomer?.saleCount,
        },
      ]
    : [];

  return (
    <div className="w-full flex flex-col py-6 border border-gray-300 rounded-xl p-4  shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Top Customer</h2>
        <ModalWrapper
          Comp={FilterBox}
          title={"Top Customer"}
          customers={customers}
          handleSet={handleSet}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
      </div>

      {topCustomer && (
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
                {topCustomer?.customerName}
              </p>
              <p className="text-sm text-gray-500">
                {topCustomer?.saleCount} Purchases — Rs.{" "}
                {topCustomer?.totalAmount?.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
