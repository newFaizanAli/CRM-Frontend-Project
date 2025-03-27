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
  CiViewList,
  GiConfirmed,
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
  const [expandedPurchase, setExpandedPurchase] = useState(null);

  const fetchPurchases = useCallback(async () => {
    try {
      const result = await handleFetch("GET", "/purchases");
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

  const deletePurchase = useCallback(async (purchase) => {
    await handleDelete(
      `Are you sure you want to delete this purchase ${purchase?.code}?`,
      "DELETE",
      `/purchase/${purchase._id}`,
      handleFetch,
      { _id: purchase._id },
      fetchPurchases
    );
  }, []);

  const confirmPurchase = useCallback(
    async (id) => {
      const confirm = window.confirm(
        "Are you sure you want to confirm this purchase?"
      );
      if (!confirm) return;

      const res = await handleFetch("POST", `/purchase/confirm/${id}`);
      fireToast(res.message, res.success);
      if (res.success) {
        await fetchPurchases();
      }
    },
    [handleFetch, fetchPurchases]
  );

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
      <div className="flex justify-end">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-primary-dark transition"
          onClick={() => navigate("/buying/purchase/add")}
        >
          + Add Purchase
        </button>
      </div>
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Total Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Bill</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((purchase, index) => (
            <React.Fragment key={index}>
              <tr className="">
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

                <td
                  className={`p-3 font-semibold ${
                    purchase?.billed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {purchase?.billed ? "payed" : "to bill"}
                </td>

                <td className="p-3">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      type="button"
                      className="hover:text-primary"
                      onClick={() =>
                        navigate("/buying/purchase/update", { state: purchase })
                      }
                    >
                      <MdOutlineEditNote size={25} />
                    </button>
                    <button
                      type="button"
                      className="hover:text-danger"
                      onClick={() => deletePurchase(purchase)}
                    >
                      <MdOutlineDeleteOutline size={25} />
                    </button>

                    <button
                      type="button"
                      className=""
                      onClick={() => toggleItems(purchase._id)}
                    >
                      <CiViewList size={25} />
                    </button>

                    {purchase.status === "Pending" && (
                      <button
                        type="button"
                        className="hover:text-blue-500"
                        onClick={() => confirmPurchase(purchase._id)}
                      >
                        <GiConfirmed size={25} />
                      </button>
                    )}
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
