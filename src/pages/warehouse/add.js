import React from "react";
import { Toaster } from "react-hot-toast";
import Form from "./form";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { wareschemaSchema } from "../../validation/schema";

const Index = () => {
  const { handleFetch } = useFetch();

  const initialValues = {
    area: "",
    city: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: wareschemaSchema,
    onSubmit: async (values) => {
      await handleFetch("POST", "/warehouse/add", { ...values });
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
         <Toaster />
         <Form formik={formik} />
      </div>
    </>
  );
};

export default Index;
