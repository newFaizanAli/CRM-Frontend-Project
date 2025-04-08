import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";

import Expense from "./expense"

import TopCards from "./topcards";
import Loading from "../../../../components/loading";
import Performance from "./perfomence";
import Income from "./income"
import ModalWrapper from "../../../../components/filterbox/modelwrapper";
import FilterBox from "../../../../components/filterbox/erp/buying";

const Index = () => {
  const { handleFetch } = useFetch();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/erp/sales/dashboard");
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
        <TopCards data={data} />
      </div>

      <div className="my-4">
        <Performance handleFetch={handleFetch} />
      </div>

      <div className="w-full flex justify-around my-4 gap-2">
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
    </div>
  );
};

export default Index;
