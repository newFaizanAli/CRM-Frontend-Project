import React, { useEffect, useState } from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { productSchema } from "../../validation/schema";
import { fireToast } from "../../utilities/functions";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const navigate = useNavigate();
  const locData = location?.state;
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/newproduct");
      if (result?.categories) {
        setCategories(result.categories);
      }
      if (result?.warehouses) {
        setWarehouses(result.warehouses);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    _id: "" || locData?._id,
    productName: "" || locData?.productName,
    sku: "" || locData?.sku,
    category: "" || locData?.category?._id,
    quantity: "" || locData?.quantity,
    warehouse: "" || locData?.warehouse?._id,
    lowStockThreshold: "" || locData?.lowStockThreshold,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await handleFetch("PUT", "/product", { ...values });
      if (result?.success) {
        navigate("/stock/product");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />
      <Form categories={categories} warehouses={warehouses} formik={formik} isUpdate={true}/>

    </div>
  );
};

export default Index;
