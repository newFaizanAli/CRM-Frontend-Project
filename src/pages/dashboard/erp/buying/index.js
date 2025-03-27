import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import SmallCard from "../../../../components/dasboard/card/smallcard";
import MonthPurchase from "./monthpurchase";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/buying/dashboard");
    const result = { ...resp };
    console.log(result);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
        <SmallCard
          title={"ANNUAL PURCHASE"}
          value={data?.totalYearlyPurchase}
        />

        {/* week order */}

        <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
          <p className="text-xs text-gray-600">{"COMPLETE PURCHASE ORDER"}</p>

          <h2 className="text-2xl font-bold text-gray-700">
            {data?.weekOrders?.currentWeekOrders}
          </h2>

          <p
            className={`text-xs font-medium ${
              data?.weekOrders?.currentWeekOrders >=
              data?.weekOrders?.lastWeekOrders
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {data?.weekOrders?.lastWeekOrders !== 0 ? (
              <>
                {Math.abs(
                  Math.round(
                    ((data?.weekOrders?.currentWeekOrders -
                      data?.weekOrders?.lastWeekOrders) /
                      data?.weekOrders?.lastWeekOrders) *
                      100
                  )
                )}{" "}
                %{" "}
                {data?.weekOrders?.currentWeekOrders >=
                data?.weekOrders?.lastWeekOrders
                  ? "Increase"
                  : "Decrease"}{" "}
                since last week
              </>
            ) : (
              "No data from last week"
            )}
          </p>
        </div>

        {/* active supplier */}

        <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
          <p className="text-xs text-gray-600">{"ACTIVE SUPPLIERS"}</p>

          <h2 className="text-2xl font-bold text-gray-700">
            {data?.activeSupplier?.currentMonth}
          </h2>

          <p
            className={`text-xs font-medium ${
              data?.activeSupplier?.currentMonth >=
              data?.activeSupplier?.lastMonth
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {data?.activeSupplier?.lastMonth !== 0 ? (
              <>
                {Math.abs(
                  Math.round(
                    ((data?.activeSupplier?.currentMonth -
                      data?.activeSupplier?.lastMonth) /
                      data?.activeSupplier?.lastMonth) *
                      100
                  )
                )}{" "}
                %{" "}
                {data?.activeSupplier?.currentMonth >=
                data?.activeSupplier?.lastMonth
                  ? "increase"
                  : "decrease"}{" "}
                since last month
              </>
            ) : (
              "No data from last month"
            )}
          </p>
        </div>
      </div>
      <MonthPurchase />
    </div>
  );
};

export default Index;
