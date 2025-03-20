import React from "react";
import Form from "../../../components/form/crm/task";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../hooks/useFetch";
import { useFormik } from "formik";
import { taskSchema } from "../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const locData = location?.state;
  const navigate = useNavigate();

  const initialValues = {
    _id: locData?._id,
    title: locData?.title || "",
    description: locData?.description || "",
    project: locData?.project?._id || "",
    assignedTo: locData?.assignedTo?._id || "",
    dueDate: locData?.dueDate
    ? new Date(locData?.dueDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
    status: locData?.status || "",
    priority: locData?.priority || "",
    taskType: locData?.taskType || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/task", { ...values });
      if (res.success) {
        navigate("/crm/project/task");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Task"}>
          <div className="p-7">
            <Form formik={formik} isUpdate={true} handleFetch={handleFetch}></Form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
