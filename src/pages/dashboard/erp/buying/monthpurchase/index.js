import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


const Index = ({ handleFetch, suppliers, ModalWrapper, FilterBox }) => {
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState({
    supplier: null,
    startDate: null,
    endDate: null,
  });

  const fetchData = async () => {
    const resp = await handleFetch("GET", `/erp/buying/dashboard/purchase/${filterValue?.supplier}/${filterValue?.startDate}/${filterValue?.endDate}`);
    setData(resp?.monthlyData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format data for the chart
  const chartData = data?.map((item) => ({
    name: monthNames[item.month - 1],
    value: item.totalAmount,
  }));

  return (
    <>
      <div className="p-4 rounded-2xl shadow-sm border border-gray-300">
        <div className="flex justify-between mb-4">
          <h2 className="text-md font-semibold text-gray-800">
            Monthly Purchase Summary
          </h2>
          <ModalWrapper
            Comp={FilterBox}
            title={"Monthly Purchase Order"}
            suppliers={suppliers}
            handleSet={fetchData}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Index;
