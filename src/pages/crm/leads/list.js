import React from "react";
import LeadBox from "../../../components/modelbox/crm/leads";
import ListView from "../../../components/listview"

const Index = () => {
 
  return (

    <ListView
      title="Leads"
      apiEndpoint="/lead"
      searchKey="code"
      modalComponent={LeadBox}
      editRoute="/crm/lead/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "company", label: "Company" },
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

