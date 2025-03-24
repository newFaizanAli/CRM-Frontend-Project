import React from "react";
import Form from "../../../components/form/crm/interaction";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../hooks/useFetch";
import { useFormik } from "formik";
import { interactionSchema } from "../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const locData = location?.state;
  const navigate = useNavigate();

  const initialValues = {
    _id: locData?._id,
    customer: locData?.customer?._id || "",
    type: locData?.type || "",
    details: locData?.details || "",
    assignedTo: locData?.assignedTo?._id || "",
    date: locData?.endDate
    ? new Date(locData?.endDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
    status: locData?.status || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: interactionSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/interaction", { ...values });
      if (res.success) {
        navigate("/crm/project/interaction");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Interaction"}>
          <div className="p-7">
            <Form formik={formik} isUpdate={true} handleFetch={handleFetch}></Form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
