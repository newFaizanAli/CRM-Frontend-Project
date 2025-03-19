import React from "react";
import { useFormik } from "formik";
import { dealSchema } from "../../../../validation/schema";
import Box from "../../index";
import Form from "../../../form/crm/deal";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    assignedTo: "",
    stage: "",
    createdAt: new Date().toISOString().split("T")[0],
    expectedCloseDate: "",
    customer: "",
    value: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: dealSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/deal", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Deal"} onClose={onClose}>
      <div className="p-2 h-80 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
