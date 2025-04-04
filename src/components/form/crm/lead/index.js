import React, { useEffect, useState } from "react";
import FormikError from "../../../text/FormikError";
import { LEADSTYPES } from "../../../../utilities/const";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newleads");
    if (result?.users) {
      setUsers(result.users);
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
              placeholder="Enter user name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"name"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="email"
              name="email"
              id="email"
              placeholder="Enter user email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"email"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="phone"
          >
            Phone
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter phone no"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"phone"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="company"
          >
            Company
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="company"
              id="company"
              placeholder="Enter company"
              value={formik.values.company}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"company"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="source"
          >
            Source
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="source"
              id="source"
              placeholder="Enter source"
              value={formik.values.source}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"source"} />
          </div>
        </div>

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
              {LEADSTYPES?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"status"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="address,"
          >
            Adress
          </label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"address"} />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black"
            htmlFor="notes"
          >
            Notes
          </label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="notes"
              id="notes"
              placeholder="Enter notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"notes"} />
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
