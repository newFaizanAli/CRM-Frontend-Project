import React, { useEffect, useState } from "react";
import Form from "./form";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { transactionSchema } from "../../../../validation/schema";
import { fireToast } from "../../../../utilities/functions";

const Index = () => {
  const { handleFetch } = useFetch();
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

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

  const initialValues = {
    transactionType: "",
    paymentType: "",
    amount: 0,
    relatedEntity: "",
    entityId: "",
    status: "",
    createdAt: new Date().toISOString().split("T")[0],
  };

  const handleUsertypes = (type) => {
    formik.values.entityId = "";

    if (type === "supplier") {
      setUserTypes(suppliers);
    } else {
      setUserTypes(customers);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: transactionSchema,
    onSubmit: async (values) => {
      const result = await handleFetch("POST", "/transaction/add", values);
      if (result.success) {
        formik.resetForm();
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
      />
    </div>
  );
};

export default Index;
