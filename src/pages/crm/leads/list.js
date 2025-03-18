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
import { useModal } from "../../../hooks/useModal";
import LeadBox from "../../../components/modelbox/crm/leads";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isModalOpen, openModal, closeModal } = useModal();

  const fetchLeads = async () => {
    try {
      const result = await handleFetch("GET", "/leads");
      if (result.leads) {
        setData(result.leads);
        setFilteredData(result.leads);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = useCallback(async (lead) => {
    await handleDelete(
      `Are you sure you want to delete this lead ${lead.code}?`,
      "DELETE",
      `/lead/${lead._id}`,
      handleFetch,
      { _id: lead._id },
      fetchLeads
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "code");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      <div className="flex justify-end">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-primary-dark transition"
          onClick={() => openModal()}
        >
          + Add Lead
        </button>
      </div>
      <LeadBox
        title={"User"}
        isOpen={isModalOpen}
        onClose={closeModal}
        handleFetch={handleFetch}
        getList={fetchLeads}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((lead, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{lead?.code}</td>
              <td className="p-3">{lead?.name}</td>
              <td className="p-3">{lead?.email}</td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/lead/update", {
                        state: lead,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteLead(lead)}
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
