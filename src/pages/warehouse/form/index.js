import React from "react";
import Formhead from "../../../components/formhead";
import FormikError from "../../../components/text/FormikError";

const Index = ({ formik, isUpdate }) => {
  return (
    <div className="col-span-5 xl:col-span-3">
      <Formhead title={isUpdate ? "Update Warehouse" : "Warehouse"}>
        <div className="p-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="area"
              >
                Area
              </label>
              <div className="relative">
                <input
                  id="area"
                  name="area"
                  type="text"
                  placeholder="Enter area"
                  className="w-full border border-stroke rounded bg-transparent py-3 px-4.5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  value={formik.values.area}
                  onChange={formik.handleChange}
                  autoComplete="area"
                />
                <FormikError formik={formik} fieldName="area" />

                
              </div>
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="city"
              >
                City
              </label>
              <div className="relative">
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  className="w-full border border-stroke rounded bg-transparent py-3 px-4.5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  autoComplete="city"
                />
                <FormikError formik={formik} fieldName="city" />

               
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
        </div>
      </Formhead>
    </div>
  );
};

export default Index;
