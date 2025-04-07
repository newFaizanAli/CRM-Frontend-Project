import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  fireToast,
  handleDelete,
  handleQuerySearch,
  pageData,
} from "../../utilities/functions";
import { Toaster } from "react-hot-toast";
import ModalWrapper from "../modalwrapper";
import Pagenator from "../paginator";
import { MdOutlineEditNote, MdOutlineDeleteOutline } from "../icons";
import CustomTable from "../table";
import Loading from "../loading";
import { UserRoleContext } from "../../context";

const Index = ({
  title,
  apiEndpoint,
  searchKey,
  columns,
  modalComponent: ModalComponent,
  editRoute,
}) => {
  const { isLoading, setLoading } = useContext(UserRoleContext);

  const { handleFetch } = useFetch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await handleFetch("GET", apiEndpoint);
      setLoading(false);
      const dataKey = Object.keys(result)[0];

      if (!dataKey) throw new Error("Unexpected API response format");
      setData(result[dataKey]);
      setFilteredData(result[dataKey]);
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = useCallback(async (item) => {
    await handleDelete(
      `Are you sure you want to delete this ${title.toLowerCase()}?`,
      "DELETE",
      `${apiEndpoint}/${item._id}`,
      handleFetch,
      { _id: item._id },
      fetchData
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, searchKey);
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
          <Toaster />
          {ModalComponent && <ModalWrapper
            Comp={ModalComponent}
            title={title}
            handleFetch={handleFetch}
            getList={fetchData}
          />}

          <CustomTable
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-meta-4">
                {columns.map((col, index) => (
                  <th key={index} className="p-3 text-left">
                    {col.label}
                  </th>
                ))}
                 <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="dark:bg-meta-4">
                  {columns.map((col, index) => (
                    <td key={index} className="p-3">
                      {col.render
                        ? col.render(item[col.key.split(".")[0]])
                        : item[col.key] || "N/A"}
                    </td>
                  ))}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {editRoute && (
                        <button
                          type="button"
                          className="hover:text-primary"
                          onClick={() => navigate(editRoute, { state: item })}
                        >
                          <MdOutlineEditNote size={25} />
                        </button>
                      )}
                      <button
                        type="button"
                        className="hover:text-danger"
                        onClick={() => deleteItem(item)}
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
      )}
    </>
  );
};

export default Index;
