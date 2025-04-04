import { useFormik } from "formik";
import React from "react";
import { transactionSchema } from "../../../validation/schema";
import Box from "../index";
import Form from "../../form/transaction";

const Index = ({ isOpen, onClose, handleFetch, getList }) => {
  const initialValues = {
    transactionType: "",
    paymentType: "",
    amount: 0,
    relatedEntity: "",
    entityId: "",
    status: "",
    createdAt: new Date().toISOString().split("T")[0],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: transactionSchema,
    onSubmit: async (values) => {
      const res = await handleFetch("POST", "/transaction", { ...values });
      if (res.success) {
        await getList();
        formik.resetForm();
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Box title={"Transaction"} onClose={onClose}>
      <div className="p-2 overflow-scroll">
        <Form formik={formik} handleFetch={handleFetch} />
      </div>
    </Box>
  );
};

export default Index;
