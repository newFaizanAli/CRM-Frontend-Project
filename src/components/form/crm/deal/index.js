import React, { useEffect, useState } from "react";
import FormikError from "../../../text/FormikError";
import { DEALSTAGES } from "../../../../utilities/const";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newdeal");
    if (result?.users) {
      setUsers(result.users);
    }
    if (result?.customers) {
      setCustomers(result.customers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="value"
          >
            Value
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="number"
              name="value"
              id="value"
              placeholder="Enter value"
              value={formik.values.value}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"value"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="statge"
          >
            Stage
          </label>
          <div className="relative">
            <select
              name="stage"
              id="stage"
              value={formik.values.stage}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select stage</option>
              {DEALSTAGES?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"stage"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="user"
          >
            Assigned to
          </label>
          <div className="relative">
            <select
              name="assignedTo"
              id="assignedTo"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select user</option>
              {users?.map((e, index) => (
                <option key={index} value={e._id}>
                  {e.name}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"assignedTo"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="customer"
          >
            Customer
          </label>
          <div className="relative">
            <select
              name="customer"
              id="status"
              value={formik.values.customer}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select customer</option>
              {customers?.map((e, index) => (
                <option key={index} value={e._id}>
                  {`${e.name} (${e.code})`}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"customer"} />
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
              placeholder="select date"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"createdAt"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="expectedCloseDate"
          >
            Expected Close Date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="expectedCloseDate"
              id="expectedCloseDate"
              placeholder="select closed date"
              value={formik.values.expectedCloseDate}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"expectedCloseDate"} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5 mt-4">
        <button
          className="flex justify-center rounded bg-gray-800 py-2 px-6 font-medium text-white hover:bg-opacity-90"
          type="submit"
        >
          {isUpdate ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Index;
