import React from "react";
import FormikError from "../../text/FormikError";

const Index = ({ formik, isUpdate }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="name"
          >
            Supplier Name
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="name"
              id="name"
              placeholder="Enter supplier name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"name"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phone"
          >
            Phone
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="number"
              placeholder="Enter supplier phone"
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              value={formik.values.phone}
              onChange={formik.handleChange}
              autoComplete="phone"
            />
            <FormikError formik={formik} fieldName={"phone"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="email"
          >
            Supplier Email
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="email"
              name="email"
              id="email"
              placeholder="Enter supplier email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"email"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="address"
          >
            Address
          </label>
          <div className="relative">
            <textarea
              id="address"
              name="address"
              type="text"
              rows={3}
              placeholder="Enter supplier address"
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              value={formik.values.address}
              onChange={formik.handleChange}
              autoComplete="address"
            />
            <FormikError formik={formik} fieldName={"address"} />
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
