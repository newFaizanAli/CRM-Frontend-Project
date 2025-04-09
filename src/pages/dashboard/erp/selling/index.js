import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";

import Performance from "./perfomence";
import Expense from "./expense";
import Income from "./income";
import SalesAnalysis from "./salesanalysis";
import TopCustomer from "./topcustomer";

import TopCards from "./topcards";
import Loading from "../../../../components/loading";
import ModalWrapper from "../../../../components/filterbox/modelwrapper";
import FilterBox from "../../../../components/filterbox/erp/selling";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/selling/dashboard");
    const result = { ...resp };
    // console.log(result)
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
        <h2 className="text-2xl text-gray-700 font-bold py-4">Selling Dashboard</h2>
        <TopCards data={data} />
      </div>

      <div className="my-4">
        <Performance
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
      </div>

      <div className="w-full flex justify-around my-2 gap-2">
        <Expense
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
        <Income
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
        />
      </div>

      <div className="w-full flex justify-around my-2 gap-2">
        <SalesAnalysis
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
          customers={data?.customers}
        />
        <TopCustomer
          handleFetch={handleFetch}
          ModalWrapper={ModalWrapper}
          FilterBox={FilterBox}
          customers={data?.customers}
        />
      </div>
    </div>
  );
};

export default Index;
