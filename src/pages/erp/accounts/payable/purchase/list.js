import React, { useCallback, useEffect, useState } from "react";

import {
  fireToast,
  handleQuerySearch,
  pageData,
} from "../../../../../utilities/functions";
import { useFetch } from "../../../../../hooks/useFetch";
import CustomTable from "../../../../../components/table";
import Pagenator from "../../../../../components/paginator";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const fetchPurchases = useCallback(async () => {
    try {
      const result = await handleFetch("GET", "/purchase");
      if (result.purchases) {
        setData(result.purchases);
        setFilteredData(result.purchases);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
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
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Total Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((purchase, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="p-3">{purchase?.code}</td>
                <td className="p-3">{`${purchase?.supplierId?.name} - ${purchase?.supplierId?.code}`}</td>
                <td className="p-3">{purchase?.totalAmount}</td>
                <td
                  className={`
              inline-flex rounded-full bg-opacity-20 mt-3 py-1 px-3 text-sm font-medium
              ${
                purchase.status === "Completed"
                  ? "bg-green-500 text-green-700"
                  : "bg-blue-500 text-blue-700"
              }`}
                >
                  {purchase.status === "Completed" ? "Completed" : "Pending"}
                </td>

                <td className="p-3">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => navigate('/payable/purchase/invoice', {
                      state : {id : purchase?._id}
                    })}
                    className="flex gap-2 bg-gray-900 hover:bg-gray-800 py-1 px-3 text-white rounded-md delay-300 font-medium"
                  >
                    Open
                  </button>
                </td>
              </tr>
            </React.Fragment>
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
