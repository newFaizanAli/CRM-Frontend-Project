import React, { useEffect, useState } from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { productSchema } from "../../validation/schema";
import { fireToast } from "../../utilities/functions";

const Index = () => {
  const { handleFetch } = useFetch();

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
    productName: "",
    sku: "",
    category: "",
    quantity: 0,
    warehouse: "",
    lowStockThreshold: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      await handleFetch("POST", "/product/add", { ...values });
      formik.resetForm();
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <Form categories={categories} warehouses={warehouses} formik={formik} />
    </div>
  );
};

export default Index;
