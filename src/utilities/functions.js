import { toast } from "react-hot-toast";
import { MINPASSLENGTH, MAXPASSLENGTH, DATAPERPAGE } from "./const";

export const getInitialName = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return initials;
};

export function validatePassword(password) {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  if (password.length < MINPASSLENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MINPASSLENGTH} characters long.`,
    };
  }
  if (password.length > MAXPASSLENGTH) {
    return {
      isValid: false,
      message: `Password must not exceed ${MAXPASSLENGTH} characters.`,
    };
  }

  if (!upperCaseRegex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!lowerCaseRegex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  if (!specialCharacterRegex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { isValid: true, message: "Password is valid." };
}

export const fetchData = async (method, url, body, form) => {

  // const fullUrl = `http://localhost:8000${url}`;

  const vercelUrl = ` https://crm-backend-project.vercel.app${url}`;

  const options = {
    method: method,
    body: form ? body : JSON.stringify(body),
    credentials: "include",
  };

  if (!form) {
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(vercelUrl, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error.message);
    throw error;
  }
};

export const fireToast = (message, type) => {
  const baseStyle = {
    duration: 5000,
    position: "bottom-right",
    style: {
      borderRadius: "8px",
      background: "#444",
      color: "#fff",
      fontSize: "0.9rem",
    },
  };

  type === false
    ? toast.error(message, baseStyle)
    : toast.success(message, baseStyle);
};

// query search

export function handleQuerySearch(
  data,
  searchQuery,
  setFilterData,
  searchField
) {
  if (!searchQuery) {
    setFilterData(data);
    return;
  }

  const filtered = data.filter((list) =>
    list[searchField]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setFilterData(filtered);
}

// pagination index

export const pageData = (currentPage, filterdData) => {
  const indexOfLastData = currentPage * DATAPERPAGE;
  const indexOfFirstData = indexOfLastData - DATAPERPAGE;
  return filterdData.slice(indexOfFirstData, indexOfLastData);
};

// hanlde Delete

export const handleDelete = async (
  confirmMessage,
  method,
  url,
  handleFetch,
  body,
  reFetch
) => {
  const confirmDelete = window.confirm(confirmMessage);
  if (!confirmDelete) return;

  try {
    await handleFetch(method, url, body && body);

    await reFetch();
  } catch (error) {
    console.error(error.message);
  }
};

export const calculateTotalWithDiscount = (totalAmount, discountAmount) => {
  if (typeof totalAmount !== "number" || typeof discountAmount !== "number") {
    throw new Error("Both totalAmount and discountAmount should be numbers.");
  }

  const totalWithDiscount = totalAmount - (totalAmount * discountAmount) / 100;
  return totalWithDiscount.toFixed(2);
};

export const calculateTotalWithTax = (totalAmount, taxAmount) => {
  if (typeof totalAmount !== "number" || typeof taxAmount !== "number") {
    throw new Error("Both totalAmount and taxAmount should be numbers.");
  }

  const totalWithTax = totalAmount + (totalAmount * taxAmount) / 100;
  return totalWithTax.toFixed(2);
};

export const calculateGrandTotal = (
  totalAmount,
  discountPercent,
  taxPercent
) => {
  totalAmount = Number(totalAmount) || 0;
  discountPercent = Number(discountPercent) || 0;
  taxPercent = Number(taxPercent) || 0;

  const discountAmount = (totalAmount * discountPercent) / 100;

  const totalAfterDiscount = totalAmount - discountAmount;

  const taxAmount = (totalAfterDiscount * taxPercent) / 100;

  const grandTotal = totalAfterDiscount + taxAmount;

  return grandTotal;
};
