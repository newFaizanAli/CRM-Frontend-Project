import React, { useEffect, useState } from "react";
import Form from "../../../../components/form/transaction";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { transactionSchema } from "../../../../validation/schema";
// import { fireToast } from "../../../../utilities/functions";
import { useLocation, useNavigate } from "react-router-dom";
import Formhead from "../../../../components/formhead";

const Index = () => {
  const { handleFetch } = useFetch();

  // const [userTypes, setUserTypes] = useState([]);
  const location = useLocation();
  const locData = location.state;
  const navigate = useNavigate();
  const isDisabled = locData?.status === "paid";

  // const fetchData = async () => {
  //   try {
  //     const result = await handleFetch("GET", "/newtransaction");
  //     // console.log(result)
  //     if (result?.suppliers) setSuppliers(result.suppliers);
  //     if (result?.customers) setCustomers(result.customers);
  //   } catch (error) {
  //     fireToast(error.message, false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (locData) {
  //     handleUsertypes(locData.relatedEntity);
  //   }else{
  //     navigate('/transaction')
  //   }
  // }, [locData, suppliers, customers]);

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
    billId: locData?.billId || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: transactionSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      const result = await handleFetch("PUT", "/transaction", values);
      if(result.success){
        formik.resetForm();
        navigate('/transaction')
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Update Transaction"}>
          <div className="p-7">
            <Form
              formik={formik}
              isUpdate={true}
              handleFetch={handleFetch}
              isDisabled={isDisabled}
              locData={locData}
            ></Form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
