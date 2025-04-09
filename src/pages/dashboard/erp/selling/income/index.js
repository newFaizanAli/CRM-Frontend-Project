import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Index = ({ handleFetch, ModalWrapper, FilterBox }) => {
  const [data, setData] = useState(null);

  const [filterValue, setFilterValue] = useState({
    startDate: null,
    endDate: null,
  });

  const fetchData = async () => {
    const resp = await handleFetch(
      "GET",
      `/erp/selling/dashboard/sales/${filterValue?.startDate}/${filterValue?.endDate}`
    );
    setData(resp?.monthlyData || []);
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
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        name: monthNames[item.month - 1],
        value: item.totalAmount,
      }))
    : [];

  return (
    <>
      <div className="w-full p-4 rounded-2xl shadow-sm border border-gray-300">
        <div className="flex justify-between mb-4">
          <h2 className="text-md font-semibold text-gray-800">
          Outgoing Bills (Sales Invoice)
          </h2>
          <ModalWrapper
            Comp={FilterBox}
            title={"Incoming Bills"}
            handleSet={fetchData}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          {chartData.length > 0 ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" barSize={30} fill="#10B981">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#10B981" />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <div className="text-center text-gray-400">No data available</div> 
          )}
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Index;
