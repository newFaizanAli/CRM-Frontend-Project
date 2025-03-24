import React from "react";
import ListView from "../../../../components/listview";
import SupplierBox from "../../../../components/modelbox/supplier";

const Index = () => {
  return (
    <ListView
      title="Supplier"
      apiEndpoint="/supplier"
      searchKey="code"
      modalComponent={SupplierBox}
      editRoute="/buying/supplier/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
      ]}
    />
  );
};

export default Index;
