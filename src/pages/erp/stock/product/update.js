import React from "react";
import Form from "../../../../components/form/product";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { productSchema } from "../../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../../components/formhead";
import { useFetch } from "../../../../hooks/useFetch";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const navigate = useNavigate();
  const locData = location?.state;

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
      <Formhead title={"Update Product"}>
        <div className="p-7">
          <Form formik={formik} isUpdate={true} handleFetch={handleFetch} />
        </div>
      </Formhead>
    </div>
  );
};

export default Index;
