import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import MonthPurchase from "./monthpurchase";
import PurchasePayment from "./purchasepayment";
import TopSupplier from "./topsuppliers";
import TopCards from "./topcards";
import Loading from "../../../../components/loading";

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
        <TopCards data={data} />
      </div>

      {/* Monthly Purchase */}

      <div>
        <MonthPurchase handleFetch={handleFetch} suppliers={data?.suppliers} />
      </div>

      {/* top suppliers & purchase payment */}

      <div className="w-full flex justify-around my-4 gap-2">
        <PurchasePayment handleFetch={handleFetch} suppliers={data?.suppliers} />
        <TopSupplier handleFetch={handleFetch} suppliers={data?.suppliers} />
      </div>
    </div>
  );
};

export default Index;
