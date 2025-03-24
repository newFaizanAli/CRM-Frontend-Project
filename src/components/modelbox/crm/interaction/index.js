import React from "react";
import { useFormik } from "formik";
import { interactionSchema } from "../../../../validation/schema";
import Box from "../../index";
import Form from "../../../form/crm/interaction";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    customer: "",
    type: "",
    details: "",
    assignedTo: "",
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: interactionSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/interaction", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Interaction"} onClose={onClose}>
      <div className="p-2 h-80 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
