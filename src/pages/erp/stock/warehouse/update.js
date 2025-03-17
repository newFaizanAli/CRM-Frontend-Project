import React, { useEffect } from "react";
import Form from "../../../../components/form/warehouse";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { warehouseSchema } from "../../../../validation/schema";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const location = useLocation();
  const locData = location.state || {};

  const initialValues = {
    _id: locData._id || "",
    area: locData.area || "",
    city: locData.city || "",
  };

  useEffect(() => {
    if (!locData._id) {
      console.log(locData);
      navigate("/stock/warehouse");
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: warehouseSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const resp = await handleFetch("PUT", "/warehouse", { ...values });
      if (resp.success) {
        navigate("/stock/warehouse");
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <Formhead title={"Update Warehouse"}>
            <div className="p-7">
              <Form formik={formik} isUpdate={true} />
            </div>
          </Formhead>
        </div>
      </div>
    </>
  );
};

export default Index;
