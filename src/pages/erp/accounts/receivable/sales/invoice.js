import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../../../hooks/useFetch";
import {
  calculateGrandTotal,
  calculateTotalWithDiscount,
  calculateTotalWithTax,
  fireToast,
} from "../../../../../utilities/functions";
import { useFormik } from "formik";
import { receivableSale } from "../../../../../validation/schema";
import FormikError from "../../../../../components/text/FormikError";
import { PAYMENTSTATUS, PAYMENTMETHODS } from "../../../../../utilities/const";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const { handleFetch } = useFetch();
  const location = useLocation();
  const navigate = useNavigate();
  const saleId = location?.state?.id || location?.state?.sale?._id;
  const [data, setData] = useState([]);
  const [saleDetail, setSaleDetail] = useState({});

  const fetchSale = useCallback(async () => {
    try {
      const result = await handleFetch("GET", `/sale/${saleId}`);
      if (result.sale) {
        setData(result?.sale);
      }

      const sale = await handleFetch("GET", `/receivable/sale/${saleId}`);

      if (sale?.data && sale?.success) {
        setSaleDetail(sale?.data);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  }, []);

  useEffect(() => {
    if (!saleId) {
      navigate("/selling/sale");
    } else {
      fetchSale();
    }
  }, []);

  const initialValues = {
    id: saleDetail?._id || "",
    status: saleDetail?.status || "",
    paid: saleDetail?.paid || 0,
    method: saleDetail?.method || "",
    sale: saleDetail?.sale || saleId,
    tax: saleDetail?.tax || 0,
    discount: saleDetail?.discount || 0,
    saleDate: saleDetail?.paymentDate
      ? new Date(saleDetail?.paymentDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: receivableSale,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const amountWithTax = calculateTotalWithTax(
        data?.totalAmount,
        values.tax
      );

      const grandTotal = Math.max(0, amountWithTax - values.discount);

      if (values.paid > grandTotal) {
        return fireToast(
          "Paid amount cannot exceed the grand total amount",
          false
        );
      }

      let route = { url: "", method: "" };
      if (initialValues?.id) {
        route = { url: "/receivable/sale", method: "PUT" };
      } else {
        route = { url: "/receivable/sale", method: "POST" };
      }

      const result = await handleFetch(route.method, route.url, values);
      if (result.success) {
        formik.resetForm();
        navigate("/receivable/list");
      }
    },
  });

  const amountWithTax = calculateTotalWithTax(
    data?.totalAmount || 0,
    formik.values.tax || 0
  );

  const amountWithDiscount = calculateTotalWithDiscount(
    data?.totalAmount || 0,
    formik.values.discount || 0
  );

  const amountGrandTotal = calculateGrandTotal(
    data?.totalAmount,
    formik.values.discount || 0,
    formik.values.tax || 0
  );

  const isDisable = saleDetail?.status === "Complete" ? true : false;

  return (
    <div className="main p-3">
      <Toaster />
      <div className="font-bold">
        <div className="flex gap-2 my-2">
          <h2 className="text-xl">{data?.code || "N/A"}</h2>
          <div
            className={`
              inline-flex rounded-full bg-opacity-20 py-1 px-3 text-sm font-medium
              ${
                data?.status === "Completed"
                  ? "bg-green-500 text-green-700"
                  : "bg-blue-500 text-blue-700"
              }`}
          >
            {data?.status === "Completed" ? "Completed" : "Pending"}
          </div>
        </div>
        <h3 className="text-sm">{"Purchase Invoice"}</h3>
      </div>
      <div className="border border-gray-300 rounded-xl p-7 my-2">
        <h3 className="text-sm font-semibold">Details</h3>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black">
              Customer
            </label>
            <input
              id="customer"
              name="customer"
              type="text"
              value={`${data?.customerId?.name} (${data?.customerId?.code})`}
              readOnly
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black">
              Purchase Date
            </label>
            <input
              id="createdAt"
              name="createdAt"
              type="date"
              value={
                data?.createdAt
                  ? new Date(data.createdAt).toISOString().split("T")[0]
                  : ""
              }
              readOnly
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
        </div>

        <div className="my-3">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Qtn</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="p-3">{item?.productId?.productName}</td>
                <td className="p-3">{item?.qtn}</td>
                <td className="p-3">{item?.price}</td>
                <td className="p-3">{item?.qtn * item?.price}</td>
              </tr>
            ))}
          </table>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Total Amount
              </label>
              <input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={data?.totalAmount}
                readOnly
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Tax
              </label>
              <input
                id="tax"
                name="tax"
                type="number"
                value={formik.values.tax}
                disabled={isDisable}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  formik.setFieldValue("tax", value);
                }}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              />
              {formik.values.tax > 0 && (
                <p className="text-xs">
                  After tax, total amount = {amountWithTax}
                </p>
              )}
              <FormikError formik={formik} fieldName={"tax"} />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Discount
              </label>
              <input
                id="discount"
                name="discount"
                type="number"
                value={formik.values.discount}
                onChange={(e) => {
                  const value = Math.min(
                    100,
                    Math.max(0, Number(e.target.value))
                  );
                  formik.setFieldValue("discount", value);
                }}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              />
              {formik.values.discount > 0 && (
                <p className="text-xs">
                  After discount, total amount = {amountWithDiscount}
                </p>
              )}

              <FormikError formik={formik} fieldName={"discount"} />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                {`Grand Total (total | tax | disc)`}
              </label>
              <input
                id="grandTotal"
                name="grandTotal"
                type="number"
                value={amountGrandTotal}
                readOnly
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Paid Amount
              </label>
              <input
                id="paid"
                name="paid"
                type="number"
                value={formik.values.paid}
                onChange={formik.handleChange}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              />
              <FormikError formik={formik} fieldName={"paid"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Payment Method
              </label>
              <select
                id="method"
                name="method"
                value={formik.values.method}
                onChange={formik.handleChange}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              >
                <option value="">Select payment method</option>

                {PAYMENTMETHODS.map((e) => (
                  <option key={e.id} value={e.method}>
                    {e.method}
                  </option>
                ))}
              </select>
              <FormikError formik={formik} fieldName={"method"} />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Payment Status
              </label>
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              >
                <option value="">Select Payment type</option>
                {PAYMENTSTATUS.map((e) => (
                  <option key={e.id} value={e.status}>
                    {e.status}
                  </option>
                ))}
              </select>
              <FormikError formik={formik} fieldName={"status"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Date
              </label>
              <input
                id="saleDate"
                name="saleDate"
                type="date"
                value={formik.values.saleDate}
                onChange={formik.handleChange}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                disabled={isDisable}
              />
              <FormikError formik={formik} fieldName={"saleDate"} />
            </div>
          </div>

          {!isDisable && (
            <div className="flex justify-end my-2">
              <button
                type="submit"
                className="bg-gray-800 text-white px-3 py-2 rounded"
              >
                Save Invoice
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Index;
