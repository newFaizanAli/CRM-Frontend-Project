import React, { useEffect, useState } from "react";
import FormikError from "../../../text/FormikError";
import { PROJECTSTATUS } from "../../../../utilities/const";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [users, setUsers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newproject");
    if (result?.users) {
      setUsers(result.users);
    }
    if (result?.deals) {
      setDeals(result.deals);
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
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"name"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="description"
          >
            Description
          </label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"description"} />
          </div>
        </div>
      </div>

      {/* deal & customer */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="deal"
          >
            Deal
          </label>
          <div className="relative">
            <select
              name="deal"
              id="deal"
              value={formik.values.deal}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select deal</option>
              {deals?.map((e, index) => (
                <option key={index} value={e._id}>
                  {e.code}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"deal"} />
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
      </div>

      {/* start date & end date */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="startDate"
          >
            Start date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="startDate"
              id="startDate"
              placeholder="select start date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"startDate"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="endDate"
          >
            End date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="endDate"
              id="endDate"
              placeholder="select end date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"endDate"} />
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
              {/* <option value="">select status</option> */}
              {PROJECTSTATUS?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"status"} />
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
