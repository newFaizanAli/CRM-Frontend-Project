import React from "react";
import { useFormik } from "formik";
import { customerSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/customer";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: customerSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/customer/add", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Customer"} onClose={onClose}>
      <div className="p-2">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
