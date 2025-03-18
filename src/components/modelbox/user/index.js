import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/crm/user";
import { RANDOMPASS } from "../../../utilities/const";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {

  const initialValues = {
    name: "",
    email: "",
    usertype: "",
    status: "",
    password: RANDOMPASS, // *CRM12345
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/signup", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"User"} onClose={onClose}>
      <div className="p-2">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
