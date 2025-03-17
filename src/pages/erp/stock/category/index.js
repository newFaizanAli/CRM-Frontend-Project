import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useFetch } from "../../../../hooks/useFetch";
import {
  fireToast,
  handleDelete,
  handleQuerySearch,
  pageData,
} from "../../../../utilities/functions";
import { categorySchema } from "../../../../validation/schema";
import {
  CiSearch,
  MdOutlineDeleteOutline,
  MdOutlineEditNote,
} from "../../../../components/icons";
import FormikError from "../../../../components/text/FormikError";
import Pagenator from "../../../../components/paginator";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const result = await handleFetch("GET", "/categories");
      setData(result.categories);
      setFilteredUsers(result.categories);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      _id: "",
      code: "",
      name: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      if (values._id) {
        const resp = await handleFetch(
          "PUT",
          `/category/${values._id}`,
          values
        );
        if (resp.success) {
          await fetchCategories();
          formik.resetForm();
        }
      } else {
        const resp = await handleFetch("POST", "/category/add", values);
        if (resp.success) {
          fetchCategories();
          formik.resetForm();
        }
      }
    },
  });

  const deleteCategory = useCallback(async (categ) => {
    await handleDelete(
      `Are you sure you want to delete this category ${categ.code}?`,
      "DELETE",
      `/category/${categ._id}`,
      handleFetch,
      { _id: categ._id },
      fetchCategories
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredUsers, "code");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredUsers);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="grid grid-cols-5 gap-8">
      <Toaster />
      <div className="col-span-5 xl:col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Category Information
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap justify-center gap-2">
                <input type="hidden" name="_id" value={formik.values._id} />

                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    className="w-full border border-stroke rounded bg-transparent py-2 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete="name"
                  />
                  <FormikError formik={formik} fieldName="name" />
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex justify-center rounded bg-gray-800 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                  >
                    {formik.values._id ? "Update" : "Save"}
                  </button>

                  <button
                    type="button"
                    className="flex justify-center rounded bg-red-500 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    onClick={() => formik.resetForm()}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="relative my-2 text-lg w-96">
              <input
                className="w-full p-3 m-2 rounded border border-stroke bg-gray text-black focus:border-primary focus-visible:outline-none"
                type="text"
                id="searchQuery"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <CiSearch color="#6C6C6C" size={25} />
              </span>
            </div>

            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 dark:bg-meta-4">
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((categ, index) => (
                  <tr key={index} className="dark:bg-meta-4">
                    <td className="p-3">{categ.code}</td>
                    <td className="p-3">{categ.name}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          className="hover:text-primary"
                          onClick={() =>
                            formik.setValues({
                              _id: categ._id,
                              code: categ.code,
                              name: categ.name,
                            })
                          }
                        >
                          <MdOutlineEditNote size={25} />
                        </button>
                        <button
                          type="button"
                          className="hover:text-danger"
                          onClick={() => deleteCategory(categ)}
                        >
                          <MdOutlineDeleteOutline size={25} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagenator
            filteredData={filteredUsers}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
