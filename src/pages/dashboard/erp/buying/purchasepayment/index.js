import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import ModalWrapper from "../../../../../components/filterbox/modelwrapper";
import FilterBox from "../../../../../components/filterbox/buying/purchaseorder";

const COLORS = ["#4ade80", "#f87171"];

const Index = ({ handleFetch, suppliers }) => {
  const [chartData, setChartData] = useState([]);
  const [filterValue, setFilterValue] = useState({
    supplier: null,
    startDate: null,
    endDate: null,
  });
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalWithAdjustments: 0,
    totalPaid: 0,
  });

  const fetchData = async () => {
    const resp = await handleFetch(
      "GET",
      `/erp/buying/dashboard/purchase/amount/${filterValue?.supplier}/${filterValue?.startDate}/${filterValue?.endDate}`
    );

    if (resp) {
      const { totalAmount, totalWithAdjustments, totalPaid } = resp;
      const remaining = totalWithAdjustments - totalPaid;

      const pieData = [
        { name: "Paid", value: totalPaid },
        { name: "Remaining", value: remaining > 0 ? remaining : 0 },
      ];

      setChartData(pieData);
      setSummary({ totalAmount, totalWithAdjustments, totalPaid });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col py-6 border border-gray-300 rounded-xl p-2 shadow-sm">
     

      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Purchase Order Analysis</h2>
        <ModalWrapper
          Comp={FilterBox}
          title={"Purchase Order Analytics"}
          suppliers={suppliers}
          handleSet={fetchData}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
      </div>

      <div className="flex justify-between">
        <div>
          {chartData.length > 0 && (
            <PieChart width={350} height={160}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          )}
        </div>
        {/* Detail */}
        <div className="text-center space-y-2">
          <p className="text-gray-700 text-xs">
            <strong>Total Amount (without adjustments):</strong> Rs.{" "}
            {summary.totalAmount.toLocaleString()}
          </p>
          <p className="text-gray-700 text-xs">
            <strong>Total After Adjustments (Tax/Discount):</strong> Rs.{" "}
            {summary.totalWithAdjustments.toLocaleString()}
          </p>
          <p className="text-gray-700 text-xs">
            <strong>Amount Paid:</strong> Rs.{" "}
            {summary.totalPaid.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
