import React from "react";
import Form from "../../../../components/form/transaction";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { transactionSchema } from "../../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();

  const location = useLocation();
  const locData = location.state;
  const navigate = useNavigate();
  const isDisabled = locData?.status === "paid";

  const initialValues = {
    _id: locData?._id || "",
    transactionType: locData?.transactionType || "",
    paymentType: locData?.paymentType || "",
    amount: locData?.amount || 0,
    relatedEntity: locData?.relatedEntity || "",
    entityId: locData?.entityId || "",
    status: locData?.status || "",
    createdAt: locData?.createdAt
      ? new Date(locData?.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: transactionSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await handleFetch("PUT", "/transaction", values);
      if (result.success) {
        formik.resetForm();
        navigate("/transaction");
      }
    },
  });

  return (

    <div className="mx-auto max-w-270">
      <Toaster />
      <Formhead title={"Update Transaction"}>
        <div className="p-7">
          <Form
            formik={formik}
            isUpdate={true}
            handleFetch={handleFetch}
            locData={locData}
            isDisabled={isDisabled}
          />
        </div>
      </Formhead>
    </div>
  );
};

export default Index;
