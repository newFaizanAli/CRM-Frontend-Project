import React from "react";
import { useLocation } from "react-router-dom";
import Form from "./form";

const Index = () => {
  
  const location = useLocation();
  const locData = location.state;
  const isDisable = locData?.status === "Completed";


  
  const initialValues = {
    _id: locData?._id || "",
    totalAmount: locData?.totalAmount || 0,
    supplierId: locData?.supplierId?._id || "",
    createdAt: locData?.createdAt
      ? new Date(locData?.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  return (
    <Form
      isUpdate={true}
      isDisable={isDisable}
      initialValues={initialValues}
      route={{
        url : "/purchase",
        method: "PUT"
      }}
      locData={locData}
    />
  );
};

export default Index;
