import React, { useEffect, useState } from "react";
import FormikError from "../../text/FormikError";
import {PAYMENTMETHODS} from "../../../utilities/const"

const Index = ({ handleFetch, formik, isUpdate, isDisabled, locData }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newtransaction");

    if (result?.suppliers) setSuppliers(result.suppliers);
    if (result?.customers) setCustomers(result.customers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUsertypes = (type) => {
    formik.values.entityId = "";
    if (type === "supplier") {
      setUserTypes(suppliers);
    } else {
      setUserTypes(customers);
    }
  };

  useEffect(() => {
    if (userTypes?.length > 0 && locData?.entityId) {
      formik.setFieldValue("entityId", locData.entityId);
    }
  }, [userTypes]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Transaction Type
          </label>
          <div className="relative">
            <select
              name="transactionType"
              value={formik.values.transactionType}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              disabled={isDisabled}
            >
              <option value="">Select type</option>

              <option value={"payable"}>Payable</option>

              <option value={"receivable"}>Receivable</option>
            </select>
            <FormikError formik={formik} fieldName="transactionType" />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Payment Type
          </label>
          <div className="relative">
            <select
              name="paymentType"
              value={formik.values.paymentType}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              disabled={isDisabled}
            >
              <option value="">Select payment type</option>

              {PAYMENTMETHODS.map((e) => (
                <option key={e.id} value={e.method}>
                  {e.method}
                </option>
              ))}

              {/* <option value={"cash"}>Cash</option>
              <option value={"digital"}>Digital</option>
              <option value={"credit"}>Credit</option> */}
            </select>
            <FormikError formik={formik} fieldName="paymentType" />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black">
            Related Entity
          </label>
          <div className="relative">
            <select
              name="relatedEntity"
              value={formik.values.relatedEntity}
              onChange={(e) => {
                handleUsertypes(e.target.value);
                formik.handleChange(e);
              }}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              disabled={isDisabled}
            >
              <option value="">Select related entity</option>

              <option value={"supplier"}>Supplier</option>

              <option value={"customer"}>Customer</option>
            </select>
            <FormikError formik={formik} fieldName="relatedEntity" />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black">
            Entity ID
          </label>
          <div className="relative">
            <select
              name="entityId"
              value={formik.values.entityId}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              disabled={isDisabled}
            >
              <option value="">Select user type</option>
              {userTypes.map((e) => (
                <option key={e._id} value={e._id}>
                  {`${e.name} (${e.code})`}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName="entityId" />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="amount"
          >
            Amount
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              disabled={isDisabled}
            />
            <FormikError formik={formik} fieldName={"amount"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black">
            Payment Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              disabled={isDisabled}
            >
              <option value="">Select payment status</option>

              <option value={"pending"}>Pending</option>
              <option value={"paid"}>Paid</option>
            </select>
            <FormikError formik={formik} fieldName="status" />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="createdAt"
          >
            Date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="createdAt"
              id="createdAt"
              placeholder="Enter createdAt"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              disabled={isDisabled}
            />
            <FormikError formik={formik} fieldName={"createdAt"} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!isDisabled && (
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          {isUpdate ? "Update" : "Save"}
        </button>
      )}
    </form>
  );
};

export default Index;
