import React from "react";
import { useFormik } from "formik";
import { supplierSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/supplier";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: supplierSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/supplier/add", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Supplier"} onClose={onClose}>
      <div className="p-2">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
