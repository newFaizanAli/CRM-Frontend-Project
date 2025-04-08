import React from "react";
import { useFormik } from "formik";
import { productSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/product";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {

  const initialValues = {
    productName: "",
    sku: "",
    category: "",
    quantity: 0,
    warehouse: "",
    lowStockThreshold: 0,
    price: 0
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/products/add", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Product"} onClose={onClose}>
      <div className="p-2">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
