import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import {
  fireToast,
  handleQuerySearch,
  pageData,
  handleDelete,
} from "../../../../utilities/functions";
import {
  MdOutlineDeleteOutline,
  MdOutlineEditNote,
} from "../../../../components/icons";
import Pagenator from "../../../../components/paginator";
import CustomTable from "../../../../components/table";
import { useNavigate } from "react-router-dom";
import CustomerBox from "../../../../components/modelbox/customer";
import ModalWrapper from "../../../../components/modalwrapper"

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

 
  const fetchCustomers = async () => {
    try {
      const result = await handleFetch("GET", "/customers");
      if (result.customers) {
        setData(result.customers);
        setFilteredData(result.customers);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = useCallback(async (customer) => {
    await handleDelete(
      `Are you sure you want to delete this customer ${customer?.code}?`,
      "DELETE",
      `/customer/${customer._id}`,
      handleFetch,
      { _id: customer._id },
      fetchCustomers
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "code");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      
      <ModalWrapper
        Comp={CustomerBox}
        title={"Customer"}
        handleFetch={handleFetch}
        getList={fetchCustomers}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((customer, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{customer?.code}</td>
              <td className="p-3">{customer?.name}</td>
              <td className="p-3">{customer?.email}</td>
              <td className="p-3">{customer?.phone}</td>
              <td className="p-3">{customer?.company}</td>
              <td
                className={`
                          inline-flex rounded-full bg-opacity-20 mt-5 py-1 px-3 text-sm font-medium
                           ${
                             customer.status === "active"
                               ? "bg-green-500 text-green-700"
                               : "bg-blue-500 text-blue-700"
                           }`}
              >
                {customer.status === "active" ? "Active" : "In Active"}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/selling/customer/update", {
                        state: customer,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteCustomer(customer)}
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
      <Pagenator
        filteredData={filteredData}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Index;
