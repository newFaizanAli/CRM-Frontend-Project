import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import {
  fireToast,
  handleQuerySearch,
  pageData,
  handleDelete,
} from "../../utilities/functions";
import {
  MdOutlineDeleteOutline,
  MdOutlineEditNote,
} from "../../components/icons";
import Pagenator from "../../components/paginator";
import CustomTable from "../../components/table";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWarehouses = async () => {
    try {
      const result = await handleFetch("GET", "/warehouses");
      setData(result.warehouses);
      setFilteredUsers(result.warehouses);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const deleteWarehouse = useCallback(async (warehouse) => {
    await handleDelete(
      `Are you sure you want to delete this warehouse location?`,
      "DELETE",
      `/warehouse/${warehouse._id}`,
      handleFetch,
      { _id: warehouse._id },
      fetchWarehouses
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredUsers, "area");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredUsers);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Area</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((loc, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{loc.area}</td>
              <td className="p-3">{loc.city}</td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/stock/warehouse/update", {
                        state: loc,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteWarehouse(loc)}
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
        filteredData={filteredUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Index;
