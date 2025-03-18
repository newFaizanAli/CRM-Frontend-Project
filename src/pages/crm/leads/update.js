import React from "react";
import Form from "../../../components/form/crm/lead";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../hooks/useFetch";
import { useFormik } from "formik";
import { leadSchema } from "../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const locData = location?.state;
  const navigate = useNavigate();

  const initialValues = {
    _id: locData?._id,

    name: locData?.name || "",
    email: locData?.email || "",
    phone: locData?.phone || "",
    company: locData?.company || "",
    source: locData?.source || "",
    assignedTo: locData?.assignedTo || "",
    status: locData?.status || "",
    createdAt: locData?.createdAt
      ? new Date(locData?.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    notes: locData?.notes || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: leadSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/lead", { ...values });
      if (res.success) {
        navigate("/crm/lead");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Lead"}>
          <div className="p-7">
            <Form formik={formik} isUpdate={true} handleFetch={handleFetch}></Form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
