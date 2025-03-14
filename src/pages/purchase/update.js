import React, { useEffect, useState } from "react";
import FormikError from "../../components/text/FormikError";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { useFormik } from "formik";
import { purchaseSchema } from "../../validation/schema";
import { fireToast } from "../../utilities/functions";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const { handleFetch } = useFetch();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const location = useLocation();
  const locData = location.state;
  const navigate = useNavigate()
  const isDisabled = locData?.status === "Completed";

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/newpurchase");
      if (result?.suppliers) setSuppliers(result.suppliers);
      if (result?.products) setProducts(result.products);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (locData?.items) {
      setSelectedProducts(
        locData.items.map((item) => ({
          productId: {
            _id: item.productId?._id || "",
            productName: item.productId?.productName || "",
          },
          quantity: Number(item.quantity) || 0, 
          price: Number(item.price) || 0, 
          amount: Number(item.quantity) * Number(item.price) || 0, 
        }))
      );
      formik.setFieldValue("totalAmount", Number(locData?.totalAmount) || 0);
    }
  }, []);

  const initialValues = {
    _id: locData?._id || "",
    totalAmount: Number(locData?.totalAmount) || 0,
    supplierId: locData?.supplierId?._id || "",
    createdAt: locData?.createdAt
        ? new Date(locData?.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: purchaseSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = { ...values, items: selectedProducts, totalAmount };

      if (data.items.length < 1) {
        fireToast("Product list is empty", false);
        return;
      }

      const hasInvalidProduct = data.items.some((item) => item.amount <= 0);
      if (hasInvalidProduct) {
        fireToast("Product price and quantity must be greater than 0", false);
        return;
      }
      
      const res = await handleFetch("PUT", "/purchase", data);
      if(res.success){
        navigate('/buying/purchase')
      }
    },
  });

  const handleAddProduct = (event) => {
    const productId = event.target.value;
    if (!productId) return;

    const product = products.find((p) => p._id === productId);
    if (!product) return;

    if (selectedProducts.some((p) => p.productId._id === productId)) {
      fireToast("Product already added", false);
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      {
        productId: { _id: product._id, productName: product.productName },
        quantity: 1,
        price: 0,
        amount: 0,
      },
    ]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.productId._id !== productId)
    );
  };

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10);
    if (newQuantity < 1) return;

    setSelectedProducts(
      selectedProducts.map((p) =>
        p.productId._id === productId
          ? { ...p, quantity: newQuantity, amount: newQuantity * p.price }
          : p
      )
    );
  };

  const handlePriceChange = (productId, value) => {
    const newPrice = parseFloat(value);
    if (newPrice < 0) return;

    setSelectedProducts(
      selectedProducts.map((p) =>
        p.productId._id === productId
          ? { ...p, price: newPrice, amount: p.quantity * newPrice }
          : p
      )
    );
  };

  const totalAmount = selectedProducts.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <div className="mx-auto max-w-270">
      <Toaster />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {!isDisabled && 'Update'} Purchase Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={formik.handleSubmit}>
                {/* Supplier Selection */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Supplier
                  </label>
                  <select
                    name="supplierId"
                    value={formik.values.supplierId}
                    onChange={formik.handleChange}
                    className="w-full border rounded bg-transparent py-3 px-6 text-black outline-none"
                    isDisabled={isDisabled}
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

                {/* Total Amount */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Total Amount
                  </label>
                  <input
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    value={totalAmount}
                    readOnly
                    className="w-full border rounded bg-transparent py-3 px-6 text-black outline-none"
                    isDisabled={isDisabled}
                  />
                </div>


                <div className="mb-5">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Date
                  </label>
                  <input
                    className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    type="date"
                    name="createdAt"
                    id="createdAt"
                    placeholder="Select Date"
                    value={formik.values.createdAt}
                    onChange={formik.handleChange}
                    isDisabled={isDisabled}
                  />
                  <FormikError formik={formik} fieldName={"createdAt"} />
                </div>

               

                {/* Product Selection */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Select Products
                  </label>
                  <select
                    name="items"
                    onChange={handleAddProduct}
                    className="w-full border rounded bg-transparent py-3 px-6 text-black outline-none"
                    isDisabled={isDisabled}
                  >
                    <option value="">Select Product</option>
                    {products.map((e) => (
                      <option key={e._id} value={e._id}>
                        {`${e.productName} (${e.code})`}
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
                            <td className="border p-2">
                              {product.productName ||
                                product.productId.productName}
                            </td>
                            <td className="border p-2">
                              <input
                                type="number"
                                value={product.price}
                                onChange={(e) =>
                                  handlePriceChange(
                                    product?.productId?._id,
                                    e.target.value
                                  )
                                }
                                className="w-16 border p-1 text-center"
                                isDisabled={isDisabled}
                              />
                            </td>
                            <td className="border p-2">
                              <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product?.productId?._id,
                                    e.target.value
                                  )
                                }
                                className="w-16 border p-1 text-center"
                                isDisabled={isDisabled}
                              />
                            </td>
                            <td className="border p-2">
                              {product.amount ||
                                product.quantity * product.price}
                            </td>
                            <td className="border p-2 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveProduct(product?.productId?._id)
                                }
                                className="text-red-500"
                                isDisabled={isDisabled}
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

                


              {!isDisabled &&  <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 rounded"
                >
                  Update
                </button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
