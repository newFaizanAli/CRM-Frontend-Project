import React from "react";
import { useFormik } from "formik";
import { warehouseSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/warehouse";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    area: "",
    city: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: warehouseSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/warehouse/add", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Warehouse"} onClose={onClose}>
      <div className="p-2">
        <Form formik={formik} />
      </div>
    </Box>
  );
};

export default Index;
