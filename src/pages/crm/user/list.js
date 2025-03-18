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
import UserBox from "../../../components/modelbox/user";

const Index = () => {
  const { handleFetch } = useFetch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isModalOpen, openModal, closeModal } = useModal();

  const fetchUsers = async () => {
    try {
      const result = await handleFetch("GET", "/users");
      if (result.users) {
        setData(result.users);
        setFilteredData(result.users);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = useCallback(async (user) => {
    await handleDelete(
      `Are you sure you want to delete this user ${user.name}?`,
      "DELETE",
      `/user/${user._id}`,
      handleFetch,
      { _id: user._id },
      fetchUsers
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "name");
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
          + Add User
        </button>
      </div>
      <UserBox
        title={"User"}
        isOpen={isModalOpen}
        onClose={closeModal}
        handleFetch={handleFetch}
        getList={fetchUsers}
      />
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{user?.name}</td>
              <td className="p-3">{user?.email}</td>
              <td className="p-3">{user?.usertype?.toUpperCase()}</td>
              <td
                className={`
                          inline-flex rounded-full bg-opacity-20 mt-5 py-1 px-3 text-sm font-medium
                           ${
                             user.status
                               ? "bg-green-500 text-green-700"
                               : "bg-red-500 text-red-700"
                           }`}
              >
                {user.status ? "Active" : "Blocked"}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/crm/user/update", {
                        state: user,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteUser(user)}
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
