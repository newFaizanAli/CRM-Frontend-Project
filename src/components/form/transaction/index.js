import React, { useEffect, useState } from "react";
import FormikError from "../../text/FormikError";
import { fireToast } from "../../../utilities/functions";

const Index = ({ handleFetch, formik, isUpdate, isDisabled, locData }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [billCode, setBillCode] = useState("");
  const [billAmmount, setBillAmmount] = useState(null);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newtransaction");

    if (result?.suppliers) setSuppliers(result.suppliers);
    if (result?.customers) setCustomers(result.customers);
  };


  const getbillAmmount = async () => {
    if (!billCode) {
      fireToast('Enter bill code', false);
      return;
    }
  
    try {
      const resp = await handleFetch("GET", `/billamount/${billCode}`);
      
      if (resp?.totalAmount) {
        setBillAmmount(resp.totalAmount);
      } else {
        fireToast(resp?.message || 'Failed to fetch bill amount', false);
      }
    } catch (error) {
      console.error("Error fetching bill amount:", error);
      fireToast('Something went wrong. Please try again.', false);
    }
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
    <div>
      <div className="py-2">
        <h3 className="text-md font-medium">Get you bill</h3>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2 py-2">
          <div className="w-full sm:w-1/2">
            <div className="relative">
              <input
                className="w-full border border-stroke rounded bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none"
                type="text"
                placeholder="Enter bill code"
                value={billCode}
                onChange={(e) => setBillCode(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="relative">
              <button
                className="w-full border border-stroke rounded py-2 px-4 text-white bg-gray-800 hover:bg-gray-900 duration-300"
                type="button"
                onClick={() => getbillAmmount()}
              >
                Get Bill
              </button>
            </div>
            {billAmmount && <p className="text-md font-medium">
             Bill Ammount : {billAmmount}
            </p>}
          </div>
        </div>
      </div>
      <hr />
      <div className="py-2">
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

                  <option value={"cash"}>Cash</option>
                  <option value={"digital"}>Digital</option>
                  <option value={"credit"}>Credit</option>
                </select>
                <FormikError formik={formik} fieldName="paymentType" />
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                className="mb-3 block text-sm font-medium text-black dark:text-white"
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
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="billId"
              >
                Bill
              </label>
              <div className="relative">
                <input
                  className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  type="text"
                  name="billId"
                  id="billId"
                  placeholder="Enter bill code"
                  value={formik.values.billId}
                  onChange={formik.handleChange}
                  disabled={isDisabled}
                />
                <FormikError formik={formik} fieldName={"billId"} />
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
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
      </div>
    </div>
  );
};

export default Index;
