import React, { useEffect, useState } from "react";
import FormikError from "../../../text/FormikError";
import { INTERACTIONTYPES } from "../../../../utilities/const";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newinteraction");

    if (result?.customers) {
      setCustomers(result.customers);
    }
    if (result?.users) {
      setUsers(result.users);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* customer & details */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
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
              id="customer"
              value={formik.values.customer}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select customer</option>
              {customers?.map((e, index) => (
                <option key={index} value={e._id}>
                  {`${e.name} (${e?.code})`}
                </option>
              ))}
            </select>

            <FormikError formik={formik} fieldName={"customer"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="details"
          >
            Details
          </label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="details"
              id="details"
              placeholder="Enter details"
              value={formik.values.details}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"details"} />
          </div>
        </div>
      </div>

      {/* status and assigned */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="assignedTo"
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
            htmlFor="status"
          >
            Status
          </label>
          <div className="relative">
            <select
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <FormikError formik={formik} fieldName={"status"} />
          </div>
        </div>
      </div>

      {/* type and date */}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="type"
          >
            Type
          </label>
          <div className="relative">
            <select
              name="type"
              id="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select deal</option>
              {INTERACTIONTYPES?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"type"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="date"
          >
            Date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="date"
              id="date"
              placeholder="select  date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"date"} />
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
