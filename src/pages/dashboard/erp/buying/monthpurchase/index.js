import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/buying/dashboard/purchase");
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
  
      <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
        <h2 className="text-md font-semibold mb-4 text-gray-800">
          Monthly Purchase Summary
        </h2>
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

  );
};

export default Index;
