import React from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { customerSchema } from "../../validation/schema";

const Index = () => {
  const { handleFetch } = useFetch();

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
      const res =  await handleFetch("POST", "/customer/add", { ...values });
      if(res.success){
        formik.resetForm();
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <Form formik={formik} />
    </div>
  );
};

export default Index;
