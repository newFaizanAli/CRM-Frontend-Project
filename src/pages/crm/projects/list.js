import React from "react";
import ListView from "../../../components/listview";
import ProjectBox from "../../../components/modelbox/crm/project";


const Index = () => {
  return (
    <ListView
      title="Project"
      apiEndpoint="/project"
      searchKey="code"
      modalComponent={ProjectBox}
      editRoute="/crm/project/update"
      columns={[
     
        { key: "code", label: "Code" },
        { key: "name", label: "Name" },
        {
          key: "customer",
          label: "Customer",
          render: (customer) =>
            `${customer?.name} (${customer?.code})` || "N/A",
        },
        {
          key: "customer",
          label: "Company",
          render: (customer) => `${customer?.company}` || "N/A",
        },
        {
          key: "deal",
          label: "Deal",
          render: (deal) => `${deal?.code}` || "N/A",
        },
        {
          key: "assignedTo",
          label: "Assigned",
          render: (assignedTo) => `${assignedTo?.name}` || "N/A",
        },
        { key: "status", label: "Status" },
       
      ]}
    />
  );
};

export default Index;
