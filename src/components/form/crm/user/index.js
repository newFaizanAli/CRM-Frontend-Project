import React from "react";
import FormikError from "../../../text/FormikError";
import { USERSTYPES } from "../../../../utilities/const";

const Index = ({ formik, isUpdate }) => {
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
            htmlFor="usertype"
          >
            Usertype
          </label>
          <div className="relative">
            <select
              name="usertype"
              id="usertype"
              value={formik.values.usertype}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select user</option>
              {USERSTYPES?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.user}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"usertype"} />
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

              <option value={true}>Active</option>
              <option value={false}>Blocked</option>
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
