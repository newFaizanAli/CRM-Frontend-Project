import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import {
  fireToast,
  handleQuerySearch,
  pageData,
  handleDelete,
} from "../../../utilities/functions";
import {
  MdOutlineDeleteOutline,
  MdOutlineEditNote,
} from "../../../components/icons";
import Pagenator from "../../../components/paginator";
import CustomTable from "../../../components/table";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../../../components/modalwrapper";
import DealBox from "../../../components/modelbox/crm/deal";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDeals = async () => {
    try {
      const result = await handleFetch("GET", "/deals");
      if (result.deals) {
        setData(result.deals);
        setFilteredData(result.deals);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const deleteDeal = useCallback(async (deal) => {
    await handleDelete(
      `Are you sure you want to delete this deal ${deal.code}?`,
      "DELETE",
      `/deal/${deal._id}`,
      handleFetch,
      { _id: deal._id },
      fetchDeals
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
        Comp={DealBox}
        title={"Deal"}
        handleFetch={handleFetch}
        getList={fetchDeals}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Value</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">C-Code</th>
            <th className="p-3 text-left">Assigned User</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((deal, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{deal?.code}</td>
              <td className="p-3">{deal?.value}</td>
              <td className="p-3">{deal?.customer?.name || "N/A"}</td>
              <td className="p-3">{deal?.customer?.code || "N/A"}</td>
              <td className="p-3">{deal?.assignedTo?.name || "N/A"}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/deal/update", {
                        state: deal,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteDeal(deal)}
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
