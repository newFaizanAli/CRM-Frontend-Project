import { useFormik } from "formik";
import React, { useState } from "react";
import { signInSchema } from "../../../validation/schema";
import FormikError from "../../../components/text/FormikError";
import { FaRegEyeSlash, FaRegEye, CiMail } from "../../../components/icons";
import { useFetch } from "../../../hooks/useFetch";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const { handleFetch } = useFetch();
  const [hidePass, setHidePass] = useState(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      await handleFetch("POST", "/signin", { ...values });
      formik.resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-orange-50  p-2 md:p-0">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="email"
              />
              <FormikError formik={formik} fieldName="email" />

              <span className="absolute right-4 top-4">
                <CiMail size={25} />
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={hidePass ? "password" : "text"}
                placeholder="Enter password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
              />
              <FormikError formik={formik} fieldName="password" />

              <button
                type="button"
                onClick={() => setHidePass(!hidePass)}
                className="absolute right-4 top-4"
              >
                {hidePass ? (
                  <FaRegEyeSlash size={25} />
                ) : (
                  <FaRegEye size={25} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={
              "bg-gray-800 hover:scale-105 hover:bg-gray-900 px-3 py-2 rounded-[8px] w-full text-white font-medium"
            }
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
