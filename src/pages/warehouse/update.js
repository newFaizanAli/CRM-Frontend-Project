import React, { useEffect } from "react";
import Form from "./form";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { wareschemaSchema } from "../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {

  const { handleFetch } = useFetch();
  const navigate = useNavigate()
  const location = useLocation()
  const locData = location.state || {}

  const initialValues = {
    _id: locData._id || "",
    area: locData.area || "",
    city: locData.city || "",
  };

  useEffect(() => {
    if(!locData._id){
      console.log(locData)
       navigate('/stock/warehouse')
    }
  },[])

  const formik = useFormik({
    initialValues,
    validationSchema: wareschemaSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      const resp =  await handleFetch("PUT", "/warehouse", { ...values });
      if(resp.success){
        navigate('/stock/warehouse')
      }
  
    },
  });
  

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
      <Form formik={formik} isUpdate={true} />
      </div>
    </>
  );
};

export default Index;
