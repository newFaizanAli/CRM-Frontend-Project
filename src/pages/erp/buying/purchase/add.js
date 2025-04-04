import React, { useEffect, useState } from "react";
import FormikError from "../../../../components/text/FormikError";
import { Toaster } from "react-hot-toast";
import { useFetch } from "../../../../hooks/useFetch";
import { useFormik } from "formik";
import { purchaseSchema } from "../../../../validation/schema";
import { fireToast } from "../../../../utilities/functions";
import Form from "./form";

const Index = () => {
  const { handleFetch } = useFetch();
  // const [suppliers, setSuppliers] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [selectedProducts, setSelectedProducts] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const result = await handleFetch("GET", "/newpurchase");
  //     if (result?.suppliers) setSuppliers(result.suppliers);
  //     if (result?.products) setProducts(result.products);
  //   } catch (error) {
  //     fireToast(error.message, false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const initialValues = {
    totalAmount: 0,
    supplierId: "",
    items: [],
    createdAt: new Date().toISOString().split("T")[0],
  };

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: purchaseSchema,
  //   onSubmit: async (values) => {
  //     const data = { ...values, items: selectedProducts };
  //     if (data.items.length < 1) {
  //       fireToast("Product list is empty", false);
  //       return;
  //     }

  //     const hasInvalidProduct =  data.items.some((item) => Number(item.quantity) <= 0);

  //     if (hasInvalidProduct) {
       
  //       fireToast("Product price and quantity must be greater than 0", false);
  //       return;
  //     }

  //     await handleFetch("POST", "/purchase/add", data);
  //     // setSelectedProducts(null);
  //     formik.resetForm();
  //   },
  // });

  // const handleAddProduct = (event) => {
  //   const productId = event.target.value;
  //   if (!productId) return;

  //   const product = products.find((p) => p._id === productId);
  //   if (!product) return;

  //   if (selectedProducts.some((p) => p._id === productId)) {
  //     fireToast("Product already added", false);
  //     return;
  //   }

  //   setSelectedProducts([
  //     ...selectedProducts,
  //     { ...product, quantity: 1, price: 0, amount: 0, productId: product._id },
  //   ]);
  // };

  // const handleRemoveProduct = (productId) => {
  //   setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  // };

  // const handleQuantityChange = (productId, value) => {
  //   const newQuantity = parseInt(value, 10);
  //   if (newQuantity < 1) return;

  //   setSelectedProducts(
  //     selectedProducts.map((p) =>
  //       p._id === productId
  //         ? { ...p, quantity: newQuantity, amount: newQuantity * p.price }
  //         : p
  //     )
  //   );
  // };

  // const handlePriceChange = (productId, value) => {
  //   const newPrice = parseFloat(value);
  //   if (newPrice < 0) return;

  //   setSelectedProducts(
  //     selectedProducts.map((p) =>
  //       p._id === productId
  //         ? { ...p, price: newPrice, amount: p.quantity * newPrice }
  //         : p
  //     )
  //   );
  // };

  // const totalAmount = selectedProducts.reduce(
  //   (acc, product) => acc + product.amount,
  //   0
  // );
  // formik.values.totalAmount = totalAmount;

  return (
    <Form
      // formik={formik}
      isUpdate={false}
      // suppliers={suppliers}
      // totalAmount={totalAmount}
      // products={products}
      // handleAddProduct={handleAddProduct}
      // selectedProducts={selectedProducts}
      // handleRemoveProduct={handleRemoveProduct}
      // handlePriceChange={handlePriceChange}
      // handleQuantityChange={handleQuantityChange}
      isDisable={false}
      initialValues={initialValues}
      route={{
        url : "/purchase/add",
        method: "POST"
      }}
    />
  );
};

export default Index;
