import React from "react";
import ListView from "../../../../components/listview";
import ProductBox from "../../../../components/modelbox/product";

const Index = () => {
  return (
    <ListView
      title="Product"
      apiEndpoint="/products"
      searchKey="code"
      modalComponent={ProductBox}
      editRoute="/stock/product/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "productName", label: "Name" },
        { key: "sku", label: "SKU" },
        { key: "price", label: "Price" },
        {
          key: "category",
          label: "Category",
          render: (category) => category?.name || "N/A",
        },
        { key: "quantity", label: "Qauntity" },
        { key: "lowStockThreshold", label: "Low stock value" },
        {
          key: "warehouse",
          label: "Warehouse",
          render: (warehouse) =>
            warehouse ? `${warehouse?.area}, ${warehouse?.city}` : "N/A",
        },
      ]}
    />
  );
};

export default Index;
