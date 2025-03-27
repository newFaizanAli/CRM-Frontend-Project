import React from "react";
import ListView from "../../../../components/listview";
import TransactionBox from "../../../../components/modelbox/transaction";

const Index = () => {
  return (
    <ListView
      title="Transaction"
      apiEndpoint="/transaction"
      searchKey="code"
      modalComponent={TransactionBox}
      editRoute="/transaction/update"
      columns={[
        { key: "code", label: "Code" },
        { key: "transactionType", label: "Type" },
        { key: "relatedEntity", label: "Entity" },
        { key: "paymentType" || "N/A", label: "Payment Type" },
        { key: "amount" || "N/A", label: "Amount" },
        { key: "status" || "N/A", label: "Status" },
      ]}
    />
  );
};

export default Index;
