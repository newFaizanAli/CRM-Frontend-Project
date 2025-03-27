import React from "react";
import ListView from "../../../components/listview"
import InteractionBox from "../../../components/modelbox/crm/interaction"

const Index = () => {
  

  return (
    <ListView
    title="Interactions"
    apiEndpoint="/interaction"
    searchKey="code"
    modalComponent={InteractionBox}
    editRoute="/crm/interaction/update"
    columns={[
      {
        key: "customer",
        label: "Customer",
        render: (customer) => `${customer?.name} (${customer?.code})` || "N/A",
      },
      {
        key: "customer",
        label: "Company",
        render: (customer) => customer.company || "N/A",
      },
      {
        key: "assignedTo",
        label: "Assigned",
        render: (assignedTo) => assignedTo?.name || "N/A",
      },
      { key: "type" || "N/A", label: "Type" },
      { key: "status" || "N/A", label: "Status" },
    ]}
  />
  );
};

export default Index;


