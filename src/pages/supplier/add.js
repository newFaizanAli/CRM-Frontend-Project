import React from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { supplierSchema } from "../../validation/schema";

const Index = () => {
  const { handleFetch } = useFetch();


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
      await handleFetch("POST", "/supplier/add", { ...values });
      formik.resetForm();
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
