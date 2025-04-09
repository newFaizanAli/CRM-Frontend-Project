import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import Loading from "../../../../components/loading";
import TopCard from "./topcards";
import LowStockProduct from "./lowstock";
import WarehouseProduct from "./warehouseproducts";
import ModalWrapper from "../../../../components/filterbox/modelwrapper";
import FilterBox from "../../../../components/filterbox/erp/stock";

const Index = () => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/stock/dashboard");
    const result = { ...resp };
    // console.log(result);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="p-4 space-y-4">
      {/* Summary Cards */}

      <div>
        <h2 className="text-2xl text-gray-700 font-bold py-4">
          Stock Dashboard
        </h2>
        <TopCard
          products={data?.products?.length}
          warehouses={data?.warehouses?.length}
          lowStockProducts={data?.lowStockCount}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Low Stock Products Table */}
        <LowStockProduct
          warehouses={data?.warehouses}
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
        <WarehouseProduct
          handleFetch={handleFetch}
          products={data?.products}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
      </div>
    </div>
  );
};

export default Index;
