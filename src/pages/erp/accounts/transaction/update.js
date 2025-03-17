import React, { useEffect, useState } from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { transactionSchema } from "../../../../validation/schema";
import { fireToast } from "../../../../utilities/functions";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const { handleFetch } = useFetch();
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const location = useLocation()
  const locData = location.state
  const navigate = useNavigate()
  const isDisabled = locData?.status === "paid";
  const isUpdate = true
  

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/newtransaction");
      // console.log(result)
      if (result?.suppliers) setSuppliers(result.suppliers);
      if (result?.customers) setCustomers(result.customers);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  
  useEffect(() => {
    if (locData) {
      handleUsertypes(locData.relatedEntity);
    }else{
      navigate('/transaction')
    }
  }, [locData, suppliers, customers]);

  const initialValues = {
    _id: locData?._id || "",
    transactionType: locData?.transactionType ||"", 
    paymentType: locData?.paymentType ||"",
    amount: locData?.amount || 0,
    relatedEntity: locData?.relatedEntity || "",
    entityId: locData?.entityId || "",
    status: locData?.status || "",
    createdAt: locData?.createdAt
        ? new Date(locData?.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
  };

  const handleUsertypes = (type) => {
    formik.values.entityId = "";

    if (type === "supplier") {
      setUserTypes(suppliers);
    } else {
      setUserTypes(customers);
    }
  };

  useEffect(() => {
    if (userTypes.length > 0 && locData?.entityId) {
      formik.setFieldValue("entityId", locData.entityId);
    }
  }, [userTypes]);

  const formik = useFormik({
    initialValues,
    validationSchema: transactionSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await handleFetch("PUT", "/transaction", values);
      if(result.success){
        formik.resetForm();
        navigate('/transaction')
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <Form
        formik={formik}
        userTypes={userTypes}
        handleUsertypes={handleUsertypes}
        isUpdate={true}
        isDisabled={isDisabled}
      />
    
    </div>
  );
};

export default Index;
