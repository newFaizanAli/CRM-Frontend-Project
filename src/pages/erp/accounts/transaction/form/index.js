import React from "react";
import Formhead from "../../../../../components/formhead";
import FormikError from "../../../../../components/text/FormikError";

const Index = ({ formik, userTypes, handleUsertypes, isUpdate, isDisabled  }) => {
  return (
    <Formhead title={(isUpdate && !isDisabled) ? "Update Transaction" : "Transaction"}>
      <div className="p-7">
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
         {!isDisabled && <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded"
          >
            {isUpdate ? "Update" : "Save"}
          </button>}
        </form>
      </div>
    </Formhead>
  );
};

export default Index;
