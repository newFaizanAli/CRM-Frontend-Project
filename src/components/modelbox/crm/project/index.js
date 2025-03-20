import React from "react";
import { useFormik } from "formik";
import { projectSchema } from "../../../../validation/schema";
import Box from "../../index";
import Form from "../../../form/crm/project";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    customer: "",
    name: "",
    description: "",
    assignedTo: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    deal: "",
    status: "pending",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: projectSchema,
    onSubmit: async (values) => {
    //   console.log(values);
      const res = await handleFetch("POST", "/project", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Project"} onClose={onClose}>
      <div className="p-2 h-80 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
