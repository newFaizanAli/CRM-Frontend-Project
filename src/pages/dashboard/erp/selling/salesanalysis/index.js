import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4ade80", "#f87171"];


const Index = ({ handleFetch, customers, ModalWrapper, FilterBox }) => {
  const [chartData, setChartData] = useState([]);
  const [filterValue, setFilterValue] = useState({
    customer: null,
    startDate: null,
    endDate: null,
    purStatus: null
  });

  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalWithAdjustments: 0,
    totalPaid: 0,
    statusFilter: null
  });

  const fetchData = async () => {
    const resp = await handleFetch(
      "GET",
      `/erp/selling/dashboard/sales/amount/${filterValue?.customer}/${filterValue?.startDate}/${filterValue?.endDate}/${filterValue?.purStatus}`
    );

    if (resp) {
      const { totalAmount, totalWithAdjustments, totalPaid, statusFilter } = resp;
      
      // Handle cases where there are no adjustments or payments
      let pieData = [];
      if (totalWithAdjustments > 0 || totalPaid > 0) {
        const remaining = Math.max(0, totalWithAdjustments - totalPaid);
        pieData = [
          { name: "Paid", value: totalPaid },
          { name: "Remaining", value: remaining },
        ];
      } else {
        // For cases like 'toBill' where there are no payments
        pieData = [
          { name: "Total Amount", value: totalAmount },
          { name: "No Payments Yet", value: 0.001 }, // Small value to show in pie chart
        ];
      }

      setChartData(pieData);
      setSummary({ 
        totalAmount, 
        totalWithAdjustments, 
        totalPaid,
        statusFilter: statusFilter || filterValue?.purStatus 
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterValue]);

  return (
    <div className="w-full flex flex-col py-6 border border-gray-300 rounded-xl p-2 shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Sales Order Analysis</h2>
        <ModalWrapper
          Comp={FilterBox}
          title={"Sales Order Analytics"}
          customers={customers}
          handleSet={fetchData}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
          purStatus={true}
        />
      </div>

      
      <div className="">
        <div>
          {chartData.length > 0 ? (
            <div className="relative">
              <PieChart width={500} height={160}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  label={({ name, percent }) => 
                    `${name}: ${percent > 0 ? (percent * 100).toFixed(1) + '%' : '0%'}`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => 
                    [`Rs. ${value.toLocaleString()}`, name]
                  }
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
              
            
              {summary.totalPaid === 0 && summary.totalWithAdjustments === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 p-2 rounded-md text-center">
                    <p className="text-xs text-gray-600">
                      {summary.totalAmount > 0 
                        ? "No payments recorded yet"
                        : "No data available"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-[350px] h-[160px] flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500 text-sm">No data to display</p>
            </div>
          )}
        </div>
        
        {/* <div className="text-center space-y-2">
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
          <p className="text-gray-700 text-xs">
            <strong>Amount Remaining:</strong> Rs.{" "}
            {Math.max(0, summary.totalWithAdjustments - summary.totalPaid).toLocaleString()}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Index;