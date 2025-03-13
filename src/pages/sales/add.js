import React, { useEffect, useState } from "react";
import FormikError from "../../components/text/FormikError";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { sellingSchema } from "../../validation/schema";
import { fireToast } from "../../utilities/functions";

const Index = () => {
  const { handleFetch } = useFetch();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/newsale");
      if (result?.customers) setCustomers(result.customers);
      if (result?.products) setProducts(result.products);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    totalAmount: 0,
    customerId: "",
    items: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: sellingSchema,
    onSubmit: async (values) => {
      const data = { ...values, items: selectedProducts };
      if (data.items.length < 1) {
        fireToast("Product list is empty", false);
        return;
      }

      const hasInvalidProduct = data.items.some((item) => item.amount <= 0);

      if (hasInvalidProduct) {
        fireToast("Product price and quantity must be greater than 0", false);
        return;
      }

      const res = await handleFetch("POST", "/sale/add", data);
      if (res.success) {
        setSelectedProducts([]);
        formik.resetForm();
      }
    },
  });

  const handleAddProduct = (event) => {
    const productId = event.target.value;
    if (!productId) return;

    const product = products.find((p) => p._id === productId);
    if (!product) return;

    if (product.quantity <= 0) {
      fireToast("This product is out of stock", false);
      return;
    }

    if (selectedProducts.some((p) => p._id === productId)) {
      fireToast("Product already added", false);
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      { ...product, qtn: 1, price: 0, amount: 0, productId: product._id },
    ]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  };

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10);
    if (newQuantity < 1) return;

    const product = selectedProducts.find((p) => p._id === productId);
    if (!product) return;

    if (newQuantity > product.quantity) {
      fireToast(
        `Only ${
          product.quantity
        } ${product.productName.toLowerCase()} in stock`,
        false
      );
      return;
    }

    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === productId
          ? { ...p, qtn: newQuantity, amount: newQuantity * p.price }
          : p
      )
    );
  };

  const handlePriceChange = (productId, value) => {
    const newPrice = parseFloat(value);
    if (newPrice < 0) return;

    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === productId
          ? { ...p, price: newPrice, amount: p.quantity * newPrice }
          : p
      )
    );
  };

  const totalAmount = selectedProducts.reduce(
    (acc, product) => acc + product.amount,
    0
  );
  formik.values.totalAmount = totalAmount;

  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Selling Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
                  {/* Supplier Selection */}
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Customer
                    </label>
                    <div className="relative">
                      <select
                        name="customerId"
                        value={formik.values.customerId}
                        onChange={formik.handleChange}
                        className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                      >
                        <option value="">Select Customer</option>
                        {customers.map((e) => (
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
                          <th className="border p-2">Stock</th>
                          <th className="border p-2">Quantity</th>
                          <th className="border p-2">Amount</th>
                          <th className="border p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts.map((product) => (
                          <tr key={product._id}>
                            <td className="border p-2">
                              {product.productName}
                            </td>
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
                            <td className="border p-2">{product.quantity}</td>
                            <td className="border p-2">
                              <input
                                type="number"
                                value={product.qtn}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product._id,
                                    e.target.value
                                  )
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
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
