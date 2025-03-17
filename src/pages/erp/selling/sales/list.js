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
  const [expandedSales, setExpandedSales] = useState(null);

  const fetchSales = useCallback( async () => {
    try {
      const result = await handleFetch("GET", "/sales");
      if (result.sales) {
        setData(result.sales);
        setFilteredData(result.sales);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, []);

  const deleteSales = useCallback(async (sale) => {
    await handleDelete(
      `Are you sure you want to delete this sale ${sale?.code}?`,
      "DELETE",
      `/sale/${sale._id}`,
      handleFetch,
      { _id: sale._id },
      fetchSales
    );
  }, []);

  const confirmSale = useCallback(
    async (id) => {
      const confirm = window.confirm(
        "Are you sure you want to confirm this sale?"
      );
      if (!confirm) return;

      const res = await handleFetch("POST", `/sale/confirm/${id}`);
      fireToast(res.message, res.success);
      if (res.success) {
        await fetchSales();
      }
    },
    [handleFetch, fetchSales]
  );

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "code");
  }, [searchQuery, data]);

  const toggleItems = (purchaseId) => {
    setExpandedSales(expandedSales === purchaseId ? null : purchaseId);
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
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((sale, index) => (
            <React.Fragment key={index}>
              <tr className="dark:bg-meta-4">
                <td className="p-3">{sale?.code}</td>
                <td className="p-3">{`${sale?.customerId?.name} - ${sale?.customerId?.code}`}</td>
                <td className="p-3">{sale?.totalAmount}</td>
                <td
                  className={`
                          inline-flex rounded-full bg-opacity-20 mt-3 py-1 px-3 text-sm font-medium
                           ${
                             sale.status === "Completed"
                               ? "bg-green-500 text-green-700"
                               : "bg-blue-500 text-blue-700"
                           }`}
                >
                  {sale.status === "Completed" ? "Completed" : "Pending"}
                </td>
                <td className="p-3">{new Date(sale.createdAt).toLocaleDateString()}</td>

               
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      type="button"
                      className="hover:text-primary"
                      onClick={() =>
                        navigate("/selling/sale/update", { state: sale })
                      }
                    >
                      <MdOutlineEditNote size={25} />
                    </button>
                    <button
                      type="button"
                      className="hover:text-danger"
                      onClick={() => deleteSales(sale)}
                    >
                      <MdOutlineDeleteOutline size={25} />
                    </button>

                    <button
                      type="button"
                      className=""
                      onClick={() => toggleItems(sale._id)}
                    >
                      <CiViewList size={25} />
                    </button>

                    {sale.status === "Pending" && (
                      <button
                        type="button"
                        className="hover:text-blue-500"
                        onClick={() => confirmSale(sale._id)}
                      >
                        <GiConfirmed size={25} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {expandedSales === sale._id && (
                <tr className="bg-gray-100 dark:bg-meta-3">
                  <td colSpan={4} className="p-3">
                    <strong>Items:</strong>
                    <ul className="mt-2">
                      {sale.items.map((item, idx) => (
                        <li key={idx} className="py-1 border-b">
                          <b>{item.productId.productName}</b> - Quantity:{" "}
                          {item.qtn}, Price: {item.price}, Amount:{" "}
                          {item.qtn * item.price}
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
