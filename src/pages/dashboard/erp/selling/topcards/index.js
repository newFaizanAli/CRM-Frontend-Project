import React from "react";
import StickyCard from "../../../../../components/dasboard/card/smallcard";

const index = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StickyCard title={"ANNUAL SALES"} value={data?.totalYearlySales || 0} />

      {/* week order */}

      <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
        <p className="text-xs text-gray-600">{"SALES ORDERS TO DELIVER"}</p>

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

      {/* active customer */}

      <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
        <p className="text-xs text-gray-600">{"ACTIVE CUSTOMER"}</p>

        <h2 className="text-2xl font-bold text-gray-700">
          {data?.activeCustomer?.currentMonth}
        </h2>

        <p
          className={`text-xs font-medium ${
            data?.activeCustomer?.currentMonth >=
            data?.activeCustomer?.lastMonth
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {data?.activeCustomer?.lastMonth !== 0 ? (
            <>
              {Math.abs(
                Math.round(
                  ((data?.activeCustomer?.currentMonth -
                    data?.activeCustomer?.lastMonth) /
                    data?.activeCustomer?.lastMonth) *
                    100
                )
              )}{" "}
              %{" "}
              {data?.activeCustomer?.currentMonth >=
              data?.activeCustomer?.lastMonth
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
  );
};

export default index;
