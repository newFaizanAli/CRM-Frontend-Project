import React from "react";
import Formhead from "../../../components/formhead";
import FormikError from "../../../components/text/FormikError";

const Index = ({
  formik,
  isUpdate,
  suppliers,
  totalAmount,
  handleAddProduct,
  products,
  selectedProducts,
  handleRemoveProduct,
  handlePriceChange,
  handleQuantityChange,
}) => {
  return (
    <div className="col-span-5 xl:col-span-3">
      <Formhead title={isUpdate ? "Update Purchase" : "Purchase"}>
        <div className="p-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
              {/* Supplier Selection */}
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Supplier
                </label>
                <div className="relative">
                  <select
                    name="supplierId"
                    value={formik.values.supplierId}
                    onChange={formik.handleChange}
                    className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((e) => (
                      <option key={e._id} value={e._id}>
                        {`${e.name} (${e.code})`}
                      </option>
                    ))}
                  </select>
                  <FormikError formik={formik} fieldName="supplierId" />
                </div>
              </div>

              {/* Total Amount */}
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Amount
                </label>
                <input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={totalAmount}
                  readOnly
                  className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
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
                    placeholder="Enter createdAt"
                    value={formik.values.createdAt}
                    onChange={formik.handleChange}
                  />
                  <FormikError formik={formik} fieldName={"createdAt"} />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-5.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Select Products
              </label>
              <select
                name="items"
                onChange={handleAddProduct}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              >
                <option value="">Select Product</option>
                {products.map((e) => (
                  <option key={e._id} value={e._id}>
                    {`${e.productName} - ${e.sku} (${e.code})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Products Table */}
            {selectedProducts.length > 0 && (
              <div className="mb-5.5">
                <table className="w-full border border-stroke">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="border p-2">Product</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Quantity</th>
                      <th className="border p-2">Amount</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="border p-2">{product.productName}</td>
                        <td className="border p-2">
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) =>
                              handlePriceChange(product._id, e.target.value)
                            }
                            className="w-16 border p-1 text-center"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
                            }
                            className="w-16 border p-1 text-center"
                          />
                        </td>
                        <td className="border p-2">{product.amount}</td>
                        <td className="border p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(product._id)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded"
            >
              {isUpdate ? "Save" : "Update"}
            </button>
          </form>
        </div>
      </Formhead>
    </div>
  );
};

export default Index;
