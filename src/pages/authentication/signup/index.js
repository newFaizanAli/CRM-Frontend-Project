import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import FormikError from "../../../components/text/FormikError";
import { signUpSchema } from "../../../validation/schema";
import { useFormik } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import {
  FaRegEye,
  FaRegEyeSlash,
  CiMail,
  CiUser,
} from "../../../components/icons";
import { fireToast, validatePassword } from "../../../utilities/functions";

const Index = () => {
  const { handleFetch } = useFetch();
  const [hidePass, setHidePass] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    usertype: "admin",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const Password = validatePassword(values.password);

      if (Password.isValid) {
        await handleFetch("POST", "/signup", { ...values });
      } else {
        fireToast(Password.message, Password.isValid);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign-Up Form</h2>

        <p className="text-sm text-gray-500 mb-6 text-center">
          Please fill out the form below with user details.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter name"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="name"
                />
                <FormikError formik={formik} fieldName="name" />

                <span className="absolute right-4 top-4">
                  <CiUser size={25} />
                </span>
              </div>
            </div>

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
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className={
                "bg-gray-800 hover:scale-105 hover:bg-gray-900 px-3 py-2 rounded-[8px] w-full text-white font-medium"
              }
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
