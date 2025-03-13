import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  usertype: Yup.string().required("Usertype is Required"),
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const wareschemaSchema = Yup.object({
  area: Yup.string().required("Area is Required"),
  city: Yup.string().required("City is Required"),
});

export const categorySchema = Yup.object({
  name: Yup.string().required("Name is Required"),
});

export const productSchema = Yup.object({
  productName: Yup.string().required("Product name is Required"),
  sku: Yup.string().required("SKU is Required"),
  category: Yup.string().required("Category is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  warehouse: Yup.string().required("Warehouse is Required"),
  lowStockThreshold: Yup.number().positive().required("Low Stock is Required"),
});

export const supplierSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email().required("Email is Required"),
  phone: Yup.number().positive().min(11).required("Phone number is required"),
  address: Yup.string().required("Address is Required"),
});

export const purchaseSchema = Yup.object({
  supplierId: Yup.string().required("Supplier ID is Required"),
  totalAmount: Yup.number().positive().required("Total ammount is Required"),
});

export const customerSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email().required("Email is Required"),
  phone: Yup.number().positive().min(11).required("Phone number is required"),
  address: Yup.string().required("Address is Required"),
});


export const sellingSchema = Yup.object({
  customerId: Yup.string().required("Customer ID is Required"),
  totalAmount: Yup.number().positive().required("Total ammount is Required"),
});

export const transactionSchema = Yup.object({
  transactionType:  Yup.string().required("Transaction type is Required"), // Payable, Receivable
  paymentType:  Yup.string(), // "Cash", "Digital", "Credit"
  amount: Yup.number().positive().required("Amount is Required"),
  relatedEntity: Yup.string().required("User type is Required"),  // Supplier, Customer
  entityId: Yup.string().required("User ID is Required"),
  status: Yup.string().required("Status is Required"), //Pending, Paid
  createdAt: Yup.string().required("Date is Required"),
});