import React from "react";
import { useFormik } from "formik";
import { leadSchema } from "../../../../validation/schema";
import Box from "../../index";
import Form from "../../../form/crm/lead";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {

  const initialValues = {
    name: "",
    email: "",
    phone: 0,
    company: "",
    source: "",
    assignedTo: "",
    status: "",
    createdAt: new Date().toISOString().split("T")[0],
    notes: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: leadSchema,
    onSubmit: async (values) => {
        // console.log(values)
      const res = await handleFetch("POST", "/lead", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Leads"} onClose={onClose}>
      <div className="p-2 h-80 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
