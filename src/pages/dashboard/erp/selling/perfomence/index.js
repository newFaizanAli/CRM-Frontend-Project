import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const Index = ({ handleFetch }) => {

  const [data, setData] = useState(null);


  const fetchData = async () => {
    const resp = await handleFetch("GET", `/erp/selling/dashboard/performance`);
    setData(resp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const income = data?.totalYearlySales || 0;
  const expense = data?.totalYearlyPurchases || 0;
  const net = income - expense;
  const isProfit = net >= 0;

  const chartData = [
    {
      name: "Income",
      amount: income,
      color: "#ec4899", // pink
    },
    {
      name: "Expense",
      amount: expense,
      color: "#3b82f6", // blue
    },
    {
      name: isProfit ? "Profit" : "Loss",
      amount: Math.abs(net),
      color: isProfit ? "#22c55e" : "#ef4444", // green or red
    },
  ];

  return (
    <div className="p-4 rounded-2xl shadow-sm border border-gray-300">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Profit and Loss</h2>
      
      </div>

      <div className="py-3 flex flex-wrap justify-around text-center">
        <div>
          <p className="text-gray-400 text-md">Total Income This Year</p>
          <h2 className="text-2xl font-medium">{income}</h2>
        </div>

        <div>
          <p className="text-gray-400 text-md">Total Expense This Year</p>
          <h2 className="text-2xl font-medium">{expense}</h2>
        </div>

        <div>
          <p className="text-gray-400 text-md">
            {isProfit ? "Profit This Year" : "Loss This Year"}
          </p>
          <h2
            className={`text-2xl font-medium ${
              isProfit ? "text-green-500" : "text-red-500"
            }`}
          >
            {Math.abs(net)}
          </h2>
        </div>
      </div>

      {/* Histogram */}
      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap={50}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Index;
