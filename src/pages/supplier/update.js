import React from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { supplierSchema } from "../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {

  const { handleFetch } = useFetch();
  const location = useLocation()
  const locData = location?.state
  const navigate = useNavigate()


  const initialValues = {
    _id: locData?._id,
    name: locData?.name,
    phone: locData?.phone,
    email: locData?.email,
    address: locData?.email,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: supplierSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/supplier", { ...values });
      if(res.success){
        navigate('/buying/supplier')
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <Form formik={formik} isUpdate={true} />
    </div>
  );
};

export default Index;
