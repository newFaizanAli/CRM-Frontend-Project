import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import {
  fireToast,
  handleQuerySearch,
  pageData,
} from "../../../../utilities/functions";
import { CiViewList } from "../../../../components/icons";
import Pagenator from "../../../../components/paginator";
import CustomTable from "../../../../components/table";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPurchase, setExpandedPurchase] = useState(null);

  const fetchPurchases = useCallback(async () => {
    try {
      const result = await handleFetch("GET", "/purchases/completed");
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

  const toggleItems = (purchaseId) => {
    setExpandedPurchase(expandedPurchase === purchaseId ? null : purchaseId);
  };

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Total Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((purchase, index) => (
            <React.Fragment key={index}>
              <tr className="dark:bg-meta-4">
                <td className="p-3">{purchase?.code}</td>
                <td className="p-3">{`${purchase?.supplierId?.name} - ${purchase?.supplierId?.code}`}</td>
                <td className="p-3">{purchase?.totalAmount}</td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      type="button"
                      className=""
                      onClick={() => toggleItems(purchase._id)}
                    >
                      <CiViewList size={25} />
                    </button>
                  </div>
                </td>
              </tr>
              {expandedPurchase === purchase._id && (
                <tr className="bg-gray-100 dark:bg-meta-3">
                  <td colSpan={4} className="p-3">
                    <strong>Items:</strong>
                    <ul className="mt-2">
                      {purchase.items.map((item, idx) => (
                        <li key={idx} className="py-1 border-b">
                          <b>{item.productId.productName}</b> - Quantity:{" "}
                          {item.quantity}, Price: {item.price}, Amount:{" "}
                          {item.quantity * item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
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
