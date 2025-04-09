import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loading from "../../../components/loading";
import TopCard from "./topcard";
import Performance from "../erp/selling/perfomence";
import Expense from "../erp/selling/expense";
import Income from "../erp/selling/income";
import ModalWrapper from "../../../components/filterbox/modelwrapper";
import FilterBox from "../../../components/filterbox/erp/selling";

const Index = () => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const resp = await handleFetch("GET", "/account/dashboard");
    const result = { ...resp };
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
        <h2 className="text-2xl text-gray-700 font-bold py-2">
          Accounts Dashboard
        </h2>
        <TopCard data={data} />
      </div>
      <div className="my-4">
        <Performance handleFetch={handleFetch} />
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
    </div>
  );
};

export default Index;
