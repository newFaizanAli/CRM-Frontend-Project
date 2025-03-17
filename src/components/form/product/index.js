import React, { useEffect, useState } from "react";
import FormikError from "../../text/FormikError";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newproduct");
    if (result?.categories) {
      setCategories(result.categories);
    }
    if (result?.warehouses) {
      setWarehouses(result.warehouses);
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
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="productName"
          >
            Product Name
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"productName"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="sku"
          >
            SKU
          </label>
          <div className="relative">
            <input
              id="sku"
              name="sku"
              type="text"
              placeholder="Enter sku"
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              value={formik.values.sku}
              onChange={formik.handleChange}
              autoComplete="sku"
            />
            <FormikError formik={formik} fieldName={"sku"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="" className="dark:bg-boxdark">
                select category
              </option>
              {categories?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {e.name}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"category"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="warehouse"
          >
            Warehouse
          </label>
          <div className="relative">
            <select
              name="warehouse"
              id="warehouse"
              value={formik.values.warehouse}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="" className="dark:bg-boxdark">
                select warehouse
              </option>
              {warehouses?.map((e, index) => (
                <option key={index} value={e._id} className="dark:bg-boxdark">
                  {`${e.area}, ${e.city}`}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"warehouse"} />
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="lowStockThreshold"
          >
            Low stock value
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="number"
              name="lowStockThreshold"
              id="lowStockThreshold"
              placeholder="Enter low stock"
              value={formik.values.lowStockThreshold}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"lowStockThreshold"} />
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
