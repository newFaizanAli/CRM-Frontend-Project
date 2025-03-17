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

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async () => {
    try {
      const result = await handleFetch("GET", "/transactions");
      if (result.transactions) {
        setData(result.transactions);
        setFilteredData(result.transactions);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = useCallback(async (transaction) => {
    await handleDelete(
      `Are you sure you want to delete this transaction ${transaction?.code}?`,
      "DELETE",
      `/transaction/${transaction._id}`,
      handleFetch,
      { _id: transaction._id },
      fetchTransactions
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "code");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Transaction</th>
            <th className="p-3 text-left">Entity</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((transaction, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{transaction?.code}</td>
              <td className="p-3">{transaction?.transactionType}</td>
              <td className="p-3">{transaction?.relatedEntity}</td>

              <td className="p-3">
                {transaction?.paymentType || "Not Provided"}
              </td>
              <td className="p-3">{transaction?.amount}</td>

              <td
                className={`
                          inline-flex rounded-full bg-opacity-20 mt-4 py-1 px-3 text-sm font-medium
                           ${
                             transaction.status === "paid"
                               ? "bg-green-500 text-green-700"
                               : "bg-blue-800 text-blue-700"
                           }`}
              >
                {transaction.status === "paid" ? "Paid" : "Pending"}
              </td>
              <td className="p-3">
                {new Date(transaction?.createdAt).toISOString().split("T")[0]}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/transaction/update", {
                        state: transaction,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteTransaction(transaction)}
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
