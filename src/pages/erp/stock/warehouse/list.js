import React from "react";
import ListView from "../../../../components/listview";
import WarehouseBox from "../../../../components/modelbox/warehouse";

const Index = () => {
  return (
    <ListView
      title="Warehouse"
      apiEndpoint="/warehouse"
      searchKey="area"
      modalComponent={WarehouseBox}
      editRoute="/stock/warehouse/update"
      columns={[
        { key: "area", label: "Area" },
        { key: "city", label: "City" }
      ]}
    />
  );
};

export default Index;