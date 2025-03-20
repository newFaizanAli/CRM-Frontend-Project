import React from "react";
import { useFormik } from "formik";
import { taskSchema } from "../../../../validation/schema";
import Box from "../../index";
import Form from "../../../form/crm/task";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: "",
    status: "",
    priority: "",
    taskType: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/task", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Task"} onClose={onClose}>
      <div className="p-2 h-80 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
