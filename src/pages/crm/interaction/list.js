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
import InteractionBox from "../../../components/modelbox/crm/interaction";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInteractions = async () => {
    try {
      const result = await handleFetch("GET", "/interactions");
      if (result.interactions) {
        setData(result.interactions);
        setFilteredData(result.interactions);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, []);

  const deleteLead = useCallback(async (interaction) => {
    await handleDelete(
      `Are you sure you want to delete this interaction ?`,
      "DELETE",
      `/interaction/${interaction._id}`,
      handleFetch,
      { _id: interaction._id },
      fetchInteractions
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
        Comp={InteractionBox}
        title={"Interaction"}
        handleFetch={handleFetch}
        getList={fetchInteractions}
      />

      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Assigned</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((interaction, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">
                {`${interaction?.customer?.name} - ${interaction?.customer?.code}` ||
                  "N/A"}
              </td>
              <td className="p-3">{interaction?.customer?.company || "N/A"}</td>
              <td className="p-3">{interaction?.assignedTo?.name || "N/A"}</td>
              <td className="p-3">{interaction?.type || "N/A"}</td>
              <td
                className={`
    inline-flex rounded-full bg-opacity-20 mt-5 py-1 px-3 text-sm font-medium
    ${
      interaction?.status === "completed"
        ? "bg-green-500 text-green-700"
        : "bg-yellow-500 text-yellow-700"
    }
  `}
              >
                {interaction?.status === "completed" ? "Completed" : "Pending"}
              </td>

              <td className="p-3">
                {new Date(interaction?.date).toLocaleDateString() || "N/A"}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/project/interaction/update", {
                        state: interaction,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteLead(interaction)}
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
