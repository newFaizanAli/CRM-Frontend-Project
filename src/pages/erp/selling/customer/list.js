import React from "react";
import ListView from "../../../../components/listview";
import CustomerBox from "../../../../components/modelbox/customer";

const Index = () => {
  return (
    <ListView
      title="Customer"
      apiEndpoint="/customer"
      searchKey="code"
      modalComponent={CustomerBox}
      editRoute="/selling/customer/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "company", label: "Company" },
      ]}
    />
  );
};

export default Index;
