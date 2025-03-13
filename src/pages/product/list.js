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
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const result = await handleFetch("GET", "/products");
      if (result.products) {
        setData(result.products);
        setFilteredData(result.products);
      }
    } catch (error) {
      fireToast(error.message, false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = useCallback(async (product) => {
    await handleDelete(
      `Are you sure you want to delete this product ${product?.code}?`,
      "DELETE",
      `/product/${product._id}`,
      handleFetch,
      { _id: product._id },
      fetchProducts
    );
  }, []);

  useEffect(() => {
    handleQuerySearch(data, searchQuery, setFilteredData, "code");
  }, [searchQuery, data]);

  const currentData = pageData(currentPage, filteredData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-4 pt-4 pb-2 shadow-md sm:px-6 xl:pb-1">
      <CustomTable setSearchQuery={setSearchQuery} searchQuery={searchQuery}>
        <thead>
          <tr className="bg-gray-200 dark:bg-meta-4">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Qauntity</th>
            <th className="p-3 text-left">Low stock value</th>
            <th className="p-3 text-left">Warehouse</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className=" dark:bg-meta-4">
              <td className="p-3">{item?.code}</td>
              <td className="p-3">{item?.productName}</td>
              <td className="p-3">{item?.sku}</td>
              <td className="p-3">{item?.category?.name}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">{item?.lowStockThreshold}</td>
              <td className="p-3">{`${item?.warehouse?.area}, ${item?.warehouse?.city}`}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() =>
                      navigate("/stock/product/update", {
                        state: item,
                      })
                    }
                  >
                    <MdOutlineEditNote size={25} />
                  </button>
                  <button
                    type="button"
                    className="hover:text-danger"
                    onClick={() => deleteProduct(item)}
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
