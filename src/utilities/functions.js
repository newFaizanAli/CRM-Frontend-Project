import { toast } from "react-hot-toast";
import { MINPASSLENGTH, MAXPASSLENGTH, DATAPERPAGE } from "./const";


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
      credentials: 'include',
    };
  
    if (!form) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }
   
    try {
      // vercel url 
      const response = await fetch(vercelUrl, options);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error: ', error.message);
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
    searchField,
  ) {
    if (!searchQuery) {
      setFilterData(data);
      return;
    }
  
    const filtered = data.filter((list) =>
      list[searchField]?.toLowerCase().includes(searchQuery.toLowerCase()),
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
  reFetch,
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
  
  

