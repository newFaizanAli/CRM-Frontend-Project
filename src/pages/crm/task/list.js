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
import TaskBox from "../../../components/modelbox/crm/task";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const result = await handleFetch("GET", "/tasks");
      if (result?.tasks) {
        setData(result.tasks);
        setFilteredData(result.tasks);
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
      `Are you sure you want to delete this task ${data.code}?`,
      "DELETE",
      `/task/${data._id}`,
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
        Comp={TaskBox}
        title={"Task"}
        handleFetch={handleFetch}
        getList={fetchData}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Assigned</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Task type</th>
            <th className="p-3 text-left">Due date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((task, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{task?.code}</td>
              <td className="p-3">{task?.title}</td>
              <td className="p-3">
                {`${task?.project?.name} (${task?.project?.code})` || "N/A"}
              </td>
              <td className="p-3">{`${task?.assignedTo?.name}` || "N/A"}</td>
              <td
                className={`
    inline-flex rounded-full bg-opacity-20 mt-5 py-1 px-3 text-sm font-medium
    ${
      task?.status === "completed"
        ? "bg-green-500 text-green-700"
        : task?.status === "in-progress"
        ? "bg-blue-500 text-blue-700"
        : task?.status === "pending"
        ? "bg-yellow-500 text-yellow-700"
        : task?.status === "overdue"
        ? "bg-orange-500 text-orange-700"
        : "bg-gray-500 text-gray-700"
    }
  `}
              >
                {task?.status === "completed"
                  ? "Completed"
                  : task?.status === "in-progress"
                  ? "In Progress"
                  : task?.status === "pending"
                  ? "Pending"
                  : task?.status === "overdue"
                  ? "Overdue"
                  : "Unknown"}
              </td>
              <td className="p-3">{task?.priority}</td>
              <td className="p-3">{task?.taskType}</td>

              <td className="p-3">
                {new Date(task?.dueDate).toLocaleDateString()}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/project/task/update", {
                        state: task,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteData(task)}
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
