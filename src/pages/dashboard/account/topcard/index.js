import React from "react";
import SmallCard from "../../../../components/dasboard/card/smallcard";

const index = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
      <SmallCard title={"TOTAL OUTGOING BILLS"} value={data?.totalOutgoing} />
      <SmallCard title={"TOTAL INCOMMING BILLS"} value={data?.totalIncomming} />
      <SmallCard
        title={"TOTAL INCOMMING PAYMENT"}
        value={data?.totalPaidIncomming}
      />
      <SmallCard
        title={"TOTAL OUTGOING PAYMENT"}
        value={data?.totalPaidOutgoing}
      />
    </div>
  );
};

export default index;
