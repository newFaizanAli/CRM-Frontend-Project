import React from "react";
import Form from "./form";

const Index = () => {
  const initialValues = {
    totalAmount: 0,
    supplierId: "",
    items: [],
    createdAt: new Date().toISOString().split("T")[0],
  };

  return (
    <Form
      isUpdate={false}
      isDisable={false}
      initialValues={initialValues}
      route={{
        url: "/purchase/add",
        method: "POST",
      }}
    />
  );
};

export default Index;
