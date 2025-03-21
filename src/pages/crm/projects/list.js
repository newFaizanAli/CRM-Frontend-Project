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
import ProjectBox from "../../../components/modelbox/crm/project";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/projects");
      if (result?.projects) {
        setData(result.projects);
        setFilteredData(result.projects);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = useCallback(async (data) => {
    await handleDelete(
      `Are you sure you want to delete this project ${data.code}?`,
      "DELETE",
      `/project/${data._id}`,
      handleFetch,
      { _id: data._id },
      fetchData
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
        Comp={ProjectBox}
        title={"Project"}
        handleFetch={handleFetch}
        getList={fetchData}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Deal</th>
            <th className="p-3 text-left">Assigned</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Start</th>
            <th className="p-3 text-left">End</th>
            <th className="p-3 text-left">Create</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((project, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{project?.code}</td>
              <td className="p-3">{project?.name}</td>
              <td className="p-3">{`${project?.customer?.name} - ${project?.customer?.code}`}</td>
              <td className="p-3">{project?.customer?.company || "N/A"}</td>
              <td className="p-3">{project?.deal?.code || "N/A"}</td>
              <td className="p-3">{project?.assignedTo?.name || "N/A"}</td>
              <td
                className={`
    inline-flex rounded-full bg-opacity-20 mt-5 py-1 px-3 text-sm font-medium
    ${
      project?.status === "completed"
        ? "bg-green-500 text-green-700"
        : project?.status === "in-progress"
        ? "bg-blue-500 text-blue-700"
        : project?.status === "pending"
        ? "bg-yellow-500 text-yellow-700"
        : project?.status === "on-hold"
        ? "bg-gray-500 text-gray-700"
        : project?.status === "cancelled"
        ? "bg-red-500 text-red-700"
        : ""
    }
  `}
              >
                {project?.status === "completed"
                  ? "Completed"
                  : project?.status === "in-progress"
                  ? "In Progress"
                  : project?.status === "pending"
                  ? "Pending"
                  : project?.status === "on-hold"
                  ? "On Hold"
                  : project?.status === "cancelled"
                  ? "Cancelled"
                  : "Unknown"}
              </td>
              <td className="p-3">
                {new Date(project?.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">
                {new Date(project?.startDate).toLocaleDateString()}
              </td>
              <td className="p-3">
                {new Date(project?.endDate).toLocaleDateString()}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/project/update", {
                        state: project,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteData(project)}
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
