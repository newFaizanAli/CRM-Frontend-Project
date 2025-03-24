import React from "react";
import ListView from "../../../components/listview";
import DealBox from "../../../components/modelbox/crm/deal";

const Index = () => {
  return (
    <ListView
      title="Deals"
      apiEndpoint="/deal"
      searchKey="code"
      modalComponent={DealBox}
      editRoute="/crm/deal/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "value", label: "Value" },
        {
          key: "customer",
          label: "Customer",
          render: (customer) =>
            `${customer?.name} (${customer?.code})` || "N/A",
        },
        {
          key: "assignedTo",
          label: "Assigned",
          render: (assignedTo) => assignedTo?.name || "N/A",
        },
      ]}
    />
  );
};

export default Index;
