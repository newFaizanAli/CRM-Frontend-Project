import React from "react";
import Form from "../../../components/form/crm/project";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../hooks/useFetch";
import { useFormik } from "formik";
import { projectSchema } from "../../../validation/schema";
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
    name: locData?.name || "",
    description: locData?.description || "",
    assignedTo: locData?.assignedTo?._id || "",
    startDate: locData?.startDate
    ? new Date(locData?.startDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
    endDate: locData?.endDate
    ? new Date(locData?.endDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
    deal: locData?.deal?._id || "",
    status: locData?.status || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: projectSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/project", { ...values });
      if (res.success) {
        navigate("/crm/project");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Project"}>
          <div className="p-7">
            <Form formik={formik} isUpdate={true} handleFetch={handleFetch}></Form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
