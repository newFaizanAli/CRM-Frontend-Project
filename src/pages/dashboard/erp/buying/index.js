import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import MonthPurchase from "./monthpurchase";
import PurchasePayment from "./purchasepayment";
import TopSupplier from "./topsuppliers";
import TopCards from "./topcards";
import Loading from "../../../../components/loading";
import ModalWrapper from "../../../../components/filterbox/modelwrapper";
import FilterBox from "../../../../components/filterbox/erp/buying";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/buying/dashboard");
    const result = { ...resp };

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="">

   

      <div>
        <h2 className="text-2xl text-gray-700 font-bold py-4">Buying Dashboard</h2>
        <TopCards data={data} />
      </div>

      {/* Monthly Purchase */}

      <div>
        <MonthPurchase
          handleFetch={handleFetch}
          suppliers={data?.suppliers}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
      </div>

      {/* top suppliers & purchase payment */}

      <div className="w-full flex justify-around my-4 gap-2">
        <PurchasePayment
          handleFetch={handleFetch}
          suppliers={data?.suppliers}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
        <TopSupplier
          handleFetch={handleFetch}
          suppliers={data?.suppliers}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
      </div>
    </div>
  );
};

export default Index;
