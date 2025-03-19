import React, { useEffect } from "react";
import Form from "../../../../components/form/customer";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { customerSchema } from "../../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const location = useLocation();
  const locData = location.state;

  useEffect(() => {
    if (!locData) {
      navigate("/selling/customer");
    }
  }, []);

  const initialValues = {
    _id: locData._id || "",
    name: locData.name || "",
    email: locData.email || "",
    phone: locData.phone || "",
    address: locData.address || "",
    status: locData.status || "",
    company: locData.company || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: customerSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/customer", { ...values });
      if (res.success) {
        navigate("/selling/customer");
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Customer"}>
          <div className="p-7">
            <Form formik={formik} isUpdate={true} />
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
