import React from "react";
import ListView from "../../../../components/listview";

const Index = () => {
  return (
    <ListView
      title="Payables"
      apiEndpoint="/payable/purchase"
      searchKey="code"
      editRoute="/payable/purchase/invoice"
      columns={[
        { key: "code", label: "Code" },
        {
          key: "purchase",
          label: "Purchase ID",
          render: (purchase) => (purchase ? `${purchase?.code}` : "N/A"),
        },
        {
          key: "purchase",
          label: "Purchase Status",
          render: (purchase) => (purchase ? `${purchase?.status}` : "N/A"),
        },
        {
          key: "purchase",
          label: "Total Amount",
          render: (purchase) => (purchase ? `${purchase?.totalAmount}` : "N/A"),
        },

        { key: "discount", label: "Discount %" },
        { key: "discount", label: "Tax %" },
        { key: "paid", label: "Paid" },
        { key: "status", label: "Payment Status" },
      ]}
    />
  );
};

export default Index;
