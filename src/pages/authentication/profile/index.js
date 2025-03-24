import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Formhead from "../../../components/formhead";
import FormikError from "../../../components/text/FormikError";
import { useFormik } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import { signUpSchema } from "../../../validation/schema";
import { fireToast, validatePassword } from "../../../utilities/functions";

const Index = () => {
  const { handleFetch } = useFetch();

  const [useProfile, setUserProfile] = useState({});
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await handleFetch("GET", "/userprofile");
      if (res?.user) {
        setUserProfile({
          _id: res?.user?._id,
          name: res?.user?.name,
          email: res?.user?.email,
          status: res?.user?.status,
          usertype: res?.user?.usertype,
        });
      }
    };
    fetchProfile();
  }, []);

  const resetPassword = async () => {
    const validPass = validatePassword(password);
    if (!validPass.isValid) {
      fireToast(validPass.message, validPass.isValid);
    } else {
      const res = await handleFetch("POST", "/password/reset", { password });
      if (res.success) {
        setPassword("");
        fireToast(res.message, res.success);
      }
    }
  };

  const initialValues = {
    _id: useProfile?._id || "",
    name: useProfile?.name || "",
    email: useProfile?.email || "",
    status: useProfile?.status || false,
    usertype: useProfile?.usertype || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await handleFetch("PUT", "/user", { ...values });
      if (res.success) {
        fireToast(res.message, res.success);
      }
    },
  });

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="col-span-5 xl:col-span-3">
        <Formhead title={"Profile"}>
          <div className="p-7">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
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
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
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

              <hr className="my-3" />

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
                <div className="w-full sm:w-1/2">
                  <div className="relative">
                    <input
                      className="mt-3 w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Update password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="relative">
                    <button
                      className="mt-3 w-full border border-stroke rounded bg-transparent py-3 px-6 text-white  bg-gray-700 hover:bg-gray-800 "
                      type="button"
                      onClick={() => resetPassword()}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4.5 mt-4">
                <button
                  className="flex justify-center rounded bg-gray-800 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  type="submit"
                >
                  {"Update"}
                </button>
              </div>
            </form>
          </div>
        </Formhead>
      </div>
    </div>
  );
};

export default Index;
