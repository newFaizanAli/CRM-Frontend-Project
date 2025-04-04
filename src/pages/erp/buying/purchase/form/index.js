import React, { useEffect, useState } from "react";
import Formhead from "../../../../../components/formhead";
import FormikError from "../../../../../components/text/FormikError";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../../hooks/useFetch";
import { fireToast } from "../../../../../utilities/functions";
import { useFormik } from "formik";
import { purchaseSchema } from "../../../../../validation/schema";
import { useNavigate } from "react-router-dom";

const Index = ({
  isUpdate,
  isDisable,
  locData,
  initialValues,
  route,
}) => {
  const { handleFetch } = useFetch();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate()

  const handleDefaultItems = () => {
    if (locData?.items) {
      console.log(locData?.items);
      setSelectedProducts(
        ...selectedProducts,
        locData?.items?.map((item) => ({
          _id: item.productId?._id,
          productId: item.productId?._id || "",
          productName: item.productId?.productName || "",
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
          amount: Number(item.quantity) * Number(item.price) || 0,
        }))
      );
      formik.setFieldValue("totalAmount", Number(locData?.totalAmount) || 0);
    }
  };

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/newpurchase");
      if (result?.suppliers) setSuppliers(result.suppliers);
      if (result?.products) setProducts(result.products);
      console.log(isUpdate)
      if (isUpdate || isDisable) {
        handleDefaultItems();
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = (event) => {
    const productId = event.target.value;
    if (!productId) return;

    const product = products.find((p) => p._id === productId);
    if (!product) return;

    if (selectedProducts.some((p) => p._id === productId)) {
      fireToast("Product already added", false);
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      { ...product, quantity: 1, price: 0, amount: 0, productId: product._id },
    ]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  };

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10);
    if (newQuantity < 1) return;

    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === productId
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
        p._id === productId
          ? { ...p, price: newPrice, amount: p.quantity * newPrice }
          : p
      )
    );
  };


  const formik = useFormik({
    initialValues,
    validationSchema: purchaseSchema,
    onSubmit: async (values) => {
      const data = { ...values, items: selectedProducts };
      if (data.items.length < 1) {
        fireToast("Product list is empty", false);
        return;
      }

      const hasInvalidProduct =  data.items.some((item) => Number(item.quantity) <= 0);

      if (hasInvalidProduct) {
       
        fireToast("Product price and quantity must be greater than 0", false);
        return;
      }

      const result = await handleFetch(route?.method, route?.url, data);
      if(result.success){
        navigate('/buying/purchase')
      }
    
    },
  });

  const totalAmount = selectedProducts.reduce(
    (acc, product) => acc + product.amount,
    0
  );
  formik.values.totalAmount = totalAmount;




  return (
    <div className="mx-auto max-w-270">
      <Toaster />

      <Formhead title={isDisable || !isUpdate ? "Purchase" : "Update Purchase"}>
        <div className="p-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
              {/* Supplier Selection */}
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black">
                  Supplier
                </label>
                <div className="relative">
                  <select
                    name="supplierId"
                    value={formik.values.supplierId}
                    onChange={formik.handleChange}
                    className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    isDisable={isDisable}
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
                <label className="mb-3 block text-sm font-medium text-black">
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
                  className="mb-3 block text-sm font-medium text-black"
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
                    isDisable={isDisable}
                  />
                  <FormikError formik={formik} fieldName={"createdAt"} />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-5.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Select Products
              </label>
              <select
                name="items"
                onChange={handleAddProduct}
                className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
                isDisable={isDisable}
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
                    <tr className="bg-gray-200">
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
                            isDisable={isDisable}
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
                            isDisable={isDisable}
                          />
                        </td>
                        <td className="border p-2">{product.amount}</td>
                        <td className="border p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(product._id)}
                            className="text-red-500"
                            isDisable={isDisable}
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

            {!isDisable && (
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded"
              >
                {isUpdate ? "Update" : "Save"}
              </button>
            )}
          </form>
        </div>
      </Formhead>
    </div>
  );
};

export default Index;
