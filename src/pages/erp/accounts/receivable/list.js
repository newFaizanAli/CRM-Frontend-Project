import React from "react";
import ListView from "../../../../components/listview";

const Index = () => {
  return (
    <ListView
      title="Receivable"
      apiEndpoint="/receivable/sale"
      searchKey="code"
      editRoute="/receivable/sale/invoice"
      columns={[
        { key: "code", label: "Code" },
        {
          key: "sale",
          label: "Sale ID",
          render: (sale) => (sale ? `${sale?.code}` : "N/A"),
        },
        {
          key: "sale",
          label: "Sale Status",
          render: (sale) => (sale ? `${sale?.status}` : "N/A"),
        },
        {
          key: "sale",
          label: "Total Amount",
          render: (sale) => (sale ? `${sale?.totalAmount}` : "N/A"),
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
