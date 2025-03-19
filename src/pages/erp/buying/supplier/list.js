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
import SupplierBox from "../../../../components/modelbox/supplier";
import ModalWrapper from "../../../../components/modalwrapper";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSuppliers = async () => {
    try {
      const result = await handleFetch("GET", "/suppliers");
      if (result.suppliers) {
        setData(result.suppliers);
        setFilteredData(result.suppliers);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = useCallback(async (supplier) => {
    await handleDelete(
      `Are you sure you want to delete this supplier ${supplier?.code}?`,
      "DELETE",
      `/supplier/${supplier._id}`,
      handleFetch,
      { _id: supplier._id },
      fetchSuppliers
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
        Comp={SupplierBox}
        title={"Supplier"}
        handleFetch={handleFetch}
        getList={fetchSuppliers}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((supplier, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{supplier?.code}</td>
              <td className="p-3">{supplier?.name}</td>
              <td className="p-3">{supplier?.email}</td>
              <td className="p-3">{supplier?.phone}</td>
              <td className="p-3">{supplier?.address}</td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/buying/supplier/update", {
                        state: supplier,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteSupplier(supplier)}
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
